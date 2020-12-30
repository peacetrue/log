package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AfterParams;
import reactor.core.publisher.Mono;

/**
 * 日志切面服务
 *
 * @author xiayx
 */
public interface LogAspectService {

    /** 新增日志 */
    Mono<Void> addLog(AfterParams<Long> afterParams);
}
