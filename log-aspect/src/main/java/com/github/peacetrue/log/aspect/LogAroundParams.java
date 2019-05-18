package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.supports.AroundParamsImpl;
import lombok.Getter;
import org.aspectj.lang.ProceedingJoinPoint;

import java.util.Objects;

/**
 * @author xiayx
 */
@Getter
public class LogAroundParams extends AroundParamsImpl {

    private LogPointcutInfo logPointcutInfo;

    public LogAroundParams(ProceedingJoinPoint proceedingJoinPoint, LogPointcutInfo logPointcutInfo) {
        super(proceedingJoinPoint);
        this.logPointcutInfo = Objects.requireNonNull(logPointcutInfo);
    }

    public LogAroundParams(ProceedingJoinPoint proceedingJoinPoint, LogPointcut logPointcut) {
        this(proceedingJoinPoint, LogPointcutInfo.fromLogPointcut(logPointcut));
    }
}
