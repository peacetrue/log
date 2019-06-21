package com.github.peacetrue.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * 环绕通知参数
 *
 * @author xiayx
 */
public interface AroundParams {
    /** 获取环绕通知切点信息 */
    ProceedingJoinPoint getProceedingJoinPoint();
}
