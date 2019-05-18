package com.github.peacetrue.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

import javax.annotation.Nullable;

/**
 * {@link AroundInterceptor#afterProceed(AfterParams)}的参数
 *
 * @author xiayx
 */
public interface AfterParams<T> {

    AroundParams getAroundParams();

    /** {@link BeforeResult#getData()} 返回的值 */
    @Nullable
    T getData();

    /** {@link ProceedingJoinPoint#proceed()} 返回的值 */
    @Nullable
    Object getReturnValue();

    /** {@link ProceedingJoinPoint#proceed()} 抛出的异常 */
    @Nullable
    Throwable getThrowable();
}
