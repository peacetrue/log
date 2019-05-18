package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AroundInterceptor;
import com.github.peacetrue.aspect.AroundParams;
import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.aspect.BeforeResult;
import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

/**
 * 将具体操作委派给{@link AroundInterceptor}， 不影响原方法逻辑
 *
 * @author xiayx
 */
public class InterceptorAroundService implements AroundService {

    private Logger logger = LoggerFactory.getLogger(getClass());
    private AroundInterceptor aroundInterceptor;

    public InterceptorAroundService(AroundInterceptor<?> aroundInterceptor) {
        this.aroundInterceptor = Objects.requireNonNull(aroundInterceptor);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object proceed(AroundParams aroundParams) throws Throwable {
        ProceedingJoinPoint point = aroundParams.getProceedingJoinPoint();
        logger.info("拦截方法[{}]", point.getSignature().toShortString());

        BeforeResult beforeResult = aroundInterceptor.beforeProceed(aroundParams);
        AfterParamsImpl afterParams = new AfterParamsImpl(aroundParams, beforeResult.getData());
        try {
            Object returnValue = beforeResult.getArgs() == null
                    ? point.proceed()
                    : point.proceed(beforeResult.getArgs());
            afterParams.setReturnValue(returnValue);
        } catch (Throwable throwable) {
            afterParams.setThrowable(throwable);
        }
        return aroundInterceptor.afterProceed(afterParams);
    }

}
