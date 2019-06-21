package com.github.peacetrue.log.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

/**
 * @author xiayx
 */
@Aspect
public class AnnotationLogAspect extends LogAspect {

    @Around(value = "@annotation(logPointcut)")
    public Object around(ProceedingJoinPoint joinPoint, LogPointcut logPointcut) throws Throwable {
        return super.around(joinPoint);
    }
}
