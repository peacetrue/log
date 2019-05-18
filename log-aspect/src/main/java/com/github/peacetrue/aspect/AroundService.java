package com.github.peacetrue.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * 环绕通知服务，将通知内容与切面相分离
 *
 * @author xiayx
 * @see AroundParams
 * @see ProceedingJoinPoint
 */
public interface AroundService {

    /** 执行方法，参考 {@link ProceedingJoinPoint#proceed()} */
    Object proceed(AroundParams aroundParams) throws Throwable;

}
