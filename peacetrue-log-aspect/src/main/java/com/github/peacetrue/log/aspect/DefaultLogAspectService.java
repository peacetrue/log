package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AfterParams;
import com.github.peacetrue.aspect.supports.DurationAroundInterceptor;
import com.github.peacetrue.log.LogAdd;
import com.github.peacetrue.log.LogService;
import com.github.peacetrue.log.aspect.config.LogPointcutInfoProvider;
import com.github.peacetrue.serialize.SerializeService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.expression.BeanFactoryResolver;
import org.springframework.core.DefaultParameterNameDiscoverer;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import javax.annotation.Nullable;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

/**
 * @author xiayx
 */
public class DefaultLogAspectService implements LogAspectService, BeanFactoryAware {

    private static final DefaultParameterNameDiscoverer DEFAULT_PARAMETER_NAME_DISCOVERER = new DefaultParameterNameDiscoverer();

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private LogService logService;
    @Autowired
    private LogBuilder logBuilder;
    @Autowired
    private SerializeService<String> serializeService;
    @Autowired
    private LogPointcutInfoProvider logPointcutInfoProvider;
    private BeanFactoryResolver beanFactoryResolver;

    private static Method getMethod(JoinPoint joinPoint) {
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        if (!method.getDeclaringClass().isInterface()) return method;

        try {
            return joinPoint.getTarget().getClass().getDeclaredMethod(method.getName(), method.getParameterTypes());
        } catch (NoSuchMethodException e) {
            throw new IllegalStateException(String.format("未能找到切点[%s]对应的方法", joinPoint.getSignature().toShortString()), e);
        }
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactoryResolver = new BeanFactoryResolver(beanFactory);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object addLog(AfterParams<Long> afterParams) {
        ProceedingJoinPoint joinPoint = afterParams.getAroundParams().getProceedingJoinPoint();
        String signature = joinPoint.getSignature().toShortString();
        Object returnValue = afterParams.getReturnValue();

        LogPointcutInfo logPointcutInfo = this.getLogPointcutInfo(afterParams);
        logger.debug("取得日志切面信息[{}]", logPointcutInfo);
        if (logPointcutInfo == null) {
            logger.warn("未找到与切点[{}]匹配的日志切面信息", signature);
            return returnValue;
        }

        Function<Object, LogAdd> logAddBuilder = value -> {
            boolean isError = value instanceof Throwable;
            return getLogAdd(joinPoint, logPointcutInfo, afterParams, isError ? null : value, isError ? value : null);
        };
        if (returnValue instanceof Mono) {
            return afterParams.getThrowable() == null
                    ? this.addLog(((Mono<Object>) returnValue), logAddBuilder)
                    : this.addLog(Mono.empty(), logAddBuilder).subscribeOn(Schedulers.boundedElastic()).subscribe();
        } else if (returnValue instanceof Flux) {
            Mono<List<Object>> mono = ((Flux<Object>) returnValue).collectList();
            return afterParams.getThrowable() == null
                    ? this.addLog(mono, logAddBuilder).flatMapMany(Flux::fromIterable)
                    : this.addLog(mono, logAddBuilder).subscribeOn(Schedulers.boundedElastic()).subscribe();
        } else {
            LogAdd logAdd = logAddBuilder.apply(afterParams.getReturnValue());
            logService.add(logAdd).subscribeOn(Schedulers.boundedElastic()).subscribe();
            return afterParams.getReturnValue();
        }
    }

    private LogAdd getLogAdd(ProceedingJoinPoint joinPoint, LogPointcutInfo logPointcutInfo,
                             AfterParams<Long> afterParams, Object returnValue, Object throwable) {
        LogEvaluationContext evaluationContext = this.buildEvaluationContext(joinPoint, returnValue);
        logger.debug("创建日志表达式取值上下文[{}]", evaluationContext);

        LogAdd logAdd = logBuilder.build(logPointcutInfo, evaluationContext);
        logAdd.setDuration(DurationAroundInterceptor.getDuration(Objects.requireNonNull(afterParams.getData())));
        logAdd.setInput(abbr(serializeService.serialize(joinPoint.getArgs()), 2048));
        logAdd.setOutput(abbr(serializeService.serialize(returnValue), 2048));
        logAdd.setException(abbr(serializeService.serialize(throwable), 1024));
        logger.debug("取得日志信息[{}]", logAdd);
        return logAdd;
    }

    private String abbr(String string, int length) {
        if (string == null) return null;
        if (string.length() <= length) return string;
        return string.substring(0, length);
    }

    private <T> Mono<T> addLog(Mono<T> mono, Function<Object, LogAdd> logAddBuilder) {
        return mono
                .doOnSuccess(o -> {
                    logService.add(logAddBuilder.apply(o)).subscribeOn(Schedulers.boundedElastic()).subscribe();
                })
                .doOnError(o -> {
                    logService.add(logAddBuilder.apply(o)).subscribeOn(Schedulers.boundedElastic()).subscribe();
                })
                ;
    }

    protected LogPointcutInfo getLogPointcutInfo(AfterParams<Long> afterParams) {
        if (afterParams.getAroundParams() instanceof LogAroundParams) {
            return ((LogAroundParams) afterParams.getAroundParams()).getLogPointcutInfo();
        }

        ProceedingJoinPoint joinPoint = afterParams.getAroundParams().getProceedingJoinPoint();
        LogPointcut logPointcut = getMethod(joinPoint).getAnnotation(LogPointcut.class);
        if (logPointcut != null) {
            return LogPointcutInfo.fromLogPointcut(logPointcut);
        } else {
            return logPointcutInfoProvider.findLogPointcutInfo(joinPoint);
        }
    }

    protected LogEvaluationContext buildEvaluationContext(ProceedingJoinPoint joinPoint, @Nullable Object returnValue) {
        LogEvaluationContext evaluationContext = new LogEvaluationContext(
                joinPoint.getTarget(), getMethod(joinPoint), joinPoint.getArgs(),
                DEFAULT_PARAMETER_NAME_DISCOVERER,
                returnValue
        );
        evaluationContext.setVariable("returning", returnValue);
        evaluationContext.setBeanResolver(beanFactoryResolver);
        return evaluationContext;
    }

}
