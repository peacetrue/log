package com.github.peacetrue.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

import javax.annotation.Nullable;

/**
 * 环绕通知拦截器
 *
 * @author xiayx
 * @see AroundParams
 * @see BeforeResult
 * @see AfterParams
 */
public interface AroundInterceptor<T> {

    /** 在{@link ProceedingJoinPoint#proceed()}之前执行 */
    BeforeResult<T> beforeProceed(AroundParams aroundParams);

    /** 在{@link ProceedingJoinPoint#proceed()}之后执行，返回[原方法返回结果] */
    @Nullable
    Object afterProceed(AfterParams<T> afterParams) throws Throwable;

}
