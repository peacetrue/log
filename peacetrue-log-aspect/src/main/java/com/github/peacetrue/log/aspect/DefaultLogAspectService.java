package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AfterParams;
import com.github.peacetrue.aspect.supports.DurationAroundInterceptor;
import com.github.peacetrue.log.aspect.config.LogPointcutInfoProvider;
import com.github.peacetrue.log.service.LogAddDTO;
import com.github.peacetrue.log.service.LogService;
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
import org.springframework.scheduling.annotation.Async;

import javax.annotation.Nullable;
import java.lang.reflect.Method;
import java.util.Objects;

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
    private LogPointcutInfoProvider logPointcutInfoProvider;
    private BeanFactoryResolver beanFactoryResolver;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactoryResolver = new BeanFactoryResolver(beanFactory);
    }

    @Override
    @SuppressWarnings("unchecked")
    @Async(AspectLogAutoConfiguration.LOG_TASK_EXECUTOR_NAME)
    public void addLog(AfterParams<Long> afterParams) {
        ProceedingJoinPoint joinPoint = afterParams.getAroundParams().getProceedingJoinPoint();

        LogPointcutInfo logPointcutInfo = this.getLogPointcutInfo(afterParams);
        logger.debug("取得日志切面信息[{}]", logPointcutInfo);
        if (logPointcutInfo == null) {
            throw new IllegalStateException(String.format("未找到与切点[%s]匹配的日志切面信息", joinPoint.getSignature().toShortString()));
        }

        LogEvaluationContext evaluationContext = this.buildEvaluationContext(joinPoint, afterParams.getReturnValue());
        logger.debug("创建日志表达式取值上下文[{}]", evaluationContext);

        LogAddDTO log = logBuilder.build(logPointcutInfo, evaluationContext);
        log.setDuration(DurationAroundInterceptor.getDuration(Objects.requireNonNull(afterParams.getData())));
        log.setInput(joinPoint.getArgs());
        log.setOutput(afterParams.getReturnValue());
        log.setException(afterParams.getThrowable());
        logger.debug("取得日志信息[{}]", log);

        logService.add(log);
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

    private static Method getMethod(JoinPoint joinPoint) {
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        if (!method.getDeclaringClass().isInterface()) return method;

        try {
            return joinPoint.getTarget().getClass().getDeclaredMethod(method.getName(), method.getParameterTypes());
        } catch (NoSuchMethodException e) {
            throw new IllegalStateException(String.format("未能找到切点[%s]对应的方法", joinPoint.getSignature().toShortString()), e);
        }
    }

}
