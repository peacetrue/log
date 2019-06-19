package com.github.peacetrue.log.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

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

    /** 获取最近的操作记录 */
    T getLatest(String moduleCode, Object recordId);

    /** 获取最近的操作记录 */
    List<T> getLatest(String moduleCode, List<?> recordIds);

}
