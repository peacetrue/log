package com.github.peacetrue.log.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 日志服务
 *
 * @param <T> 具体的日志类型
 * @author xiayx
 */
public interface LogService<T extends Log> {

    /** 添加日志 */
    T add(T log);

    /** 分页查询日志信息 */
    Page<T> query(QueryParams queryParams, Pageable pageable);

}
