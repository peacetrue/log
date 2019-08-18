package com.github.peacetrue.log;

import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.aspect.supports.AroundParamsImpl;
import com.github.peacetrue.log.aspect.LogAroundParams;
import com.github.peacetrue.log.aspect.LogPointcutInfo;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author xiayx
 */
@Aspect
public class UserModifyAspect {

    //tag::Autowired[]
    @Autowired
    private AroundService logAroundService;

    //end::Autowired[]

    //tag::config[]
    @Around("execution(* UserService.modify(..))")
    public Object aroundWithConfig(ProceedingJoinPoint joinPoint) throws Throwable {
        return logAroundService.proceed(new AroundParamsImpl(joinPoint));
    }
    //end::config[]

    //tag::direct[]
    @Around("execution(* UserService.modify(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        LogPointcutInfo info = new LogPointcutInfo();
        info.setModuleCode("User");
        info.setRecordId("#p0.id");
        info.setOperateCode("modify");
        info.setDescription("修改用户#{#p0.name}");
        info.setCreatorId("#{#p0.id}");
        return logAroundService.proceed(new LogAroundParams(joinPoint, info));
    }

    //end::direct[]
}
