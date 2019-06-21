package com.github.peacetrue.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

import javax.annotation.Nullable;

/**
 * @author xiayx
 */
public interface BeforeResult<T> {

    /** {@link ProceedingJoinPoint#getArgs()} 返回的参数 */
    @Nullable
    Object[] getArgs();

    /** 自定义数据，用于传递给 {@link AfterParams#getData()} */
    @Nullable
    T getData();
}
