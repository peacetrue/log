package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AroundParams;
import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.aspect.supports.AroundParamsImpl;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * 日志切面。拦截注解{@link LogPointcut}标注的方法
 *
 * @author xiayx
 */
public class LogAspect {

    @Autowired
    @Qualifier(AspectLogAutoConfiguration.LOG_AROUND_SERVICE_NAME)
    protected AroundService logAroundService;

    protected Object around(AroundParams aroundParams) throws Throwable {
        return logAroundService.proceed(aroundParams);
    }

    protected Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        return this.around(new AroundParamsImpl(joinPoint));
    }


}
