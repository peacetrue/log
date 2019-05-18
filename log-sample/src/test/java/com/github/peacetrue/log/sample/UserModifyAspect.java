package com.github.peacetrue.log.sample;

import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.log.aspect.LogAroundParams;
import com.github.peacetrue.log.aspect.config.LogPointcutInfoProvider;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author xiayx
 */
@Aspect
public class UserModifyAspect {
    @Autowired
    private AroundService logAroundService;
    @Autowired
    private LogPointcutInfoProvider logPointcutInfoProvider;

    @Around("execution(public * UserService.modify(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        return logAroundService.proceed(new LogAroundParams(joinPoint, logPointcutInfoProvider.findLogPointcutInfo(joinPoint)));
    }
}
