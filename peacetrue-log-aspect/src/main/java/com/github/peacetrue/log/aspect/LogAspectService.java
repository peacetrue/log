package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AfterParams;

/**
 * 日志切面服务
 *
 * @author xiayx
 */
public interface LogAspectService {

    /** 新增日志 */
    void addLog(AfterParams<Long> afterParams);
}
