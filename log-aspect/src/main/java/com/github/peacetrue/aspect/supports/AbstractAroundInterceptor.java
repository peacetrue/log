package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AfterParams;
import com.github.peacetrue.aspect.AroundParams;
import com.github.peacetrue.aspect.BeforeResult;
import com.github.peacetrue.aspect.AroundInterceptor;

import javax.annotation.Nullable;

/**
 * 默认实现，什么也没做
 *
 * @author xiayx
 */
public abstract class AbstractAroundInterceptor<T> implements AroundInterceptor<T> {

    @Override
    public BeforeResult<T> beforeProceed(AroundParams aroundParams) {
        return new BeforeResultImpl<>(aroundParams.getProceedingJoinPoint().getArgs());
    }

    @Nullable
    @Override
    public Object afterProceed(AfterParams<T> afterParams) throws Throwable {
        if (afterParams.getThrowable() != null) throw afterParams.getThrowable();
        return afterParams.getReturnValue();
    }
}
