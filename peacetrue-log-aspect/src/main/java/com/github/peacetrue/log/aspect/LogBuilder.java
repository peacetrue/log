package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.service.LogAddDTO;

/**
 * 日志构建器
 *
 * @author xiayx
 */
public interface LogBuilder {
    /** 构建日志 */
    LogAddDTO build(LogPointcutInfo logPointcutInfo, LogEvaluationContext context);
}
