package com.github.peacetrue.aspect;

import com.github.peacetrue.aspect.supports.AroundParamsImpl;
import com.github.peacetrue.log.aspect.LogPointcut;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author xiayx
 */
@Aspect
public class DurationAspect {

    @Autowired
    private AroundService durationAroundService;

    @Around("execution(* com.github.peacetrue.aspect.DurationClient.sleepOneSecond(..))")
    public Object advice(ProceedingJoinPoint joinPoint) throws Throwable {
        return durationAroundService.proceed(new AroundParamsImpl(joinPoint));
    }
}
