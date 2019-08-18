package com.github.peacetrue.log.sample;

import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.aspect.supports.AroundParamsImpl;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author xiayx
 */
@Aspect
@Component
public class LogQueryAspect {
    @Autowired
    private AroundService logAroundService;

    @Around("execution(public * com.github.peacetrue.log.service.LogService.query(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        return logAroundService.proceed(new AroundParamsImpl(joinPoint));
    }
}
