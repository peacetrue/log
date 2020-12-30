package com.github.peacetrue.log.aspect.config;

import com.github.peacetrue.log.aspect.LogPointcutInfo;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author xiayx
 */
public class LogPointcutInfoProviderImpl implements LogPointcutInfoProvider {

    private Map<String, LogPointcutInfo> pointcutInfos = new HashMap<>();

    public LogPointcutInfoProviderImpl(Map<String, LogPointcutInfo> pointcutInfos) {
        this.pointcutInfos.putAll(Objects.requireNonNull(pointcutInfos));
    }

    public static String uniqueId(JoinPoint joinPoint) {
        String simpleName = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = ((MethodSignature) joinPoint.getSignature()).getMethod().getName();
        return simpleName + "_" + methodName;
    }

    @Override
    public LogPointcutInfo findLogPointcutInfo(JoinPoint joinPoint) {
        String uniqueId = uniqueId(joinPoint);
        return pointcutInfos.get(uniqueId);
    }
}
