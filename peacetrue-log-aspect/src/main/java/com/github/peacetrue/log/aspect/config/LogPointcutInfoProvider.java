package com.github.peacetrue.log.aspect.config;

import com.github.peacetrue.log.aspect.LogPointcutInfo;
import org.aspectj.lang.JoinPoint;

import javax.annotation.Nullable;

/**
 * 日志切面信息提供者
 *
 * @author xiayx
 */
public interface LogPointcutInfoProvider {

    /** 找到切点对应的日志切面信息 */
    @Nullable
    LogPointcutInfo findLogPointcutInfo(JoinPoint joinPoint);

}
