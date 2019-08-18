package com.github.peacetrue.log.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.annotation.Nullable;
import java.util.List;

/**
 * 日志服务
 *
 * @author xiayx
 */
public interface LogService {

    /** 添加日志 */
    LogVO add(LogAddDTO dto);

    /** 分页查询日志信息 */
    Page<LogVO> query(@Nullable LogQueryDTO dto, Pageable pageable);

    /** 获取最近的操作记录 */
    LogVO getLatest(String moduleCode, Object recordId);

    /** 获取最近的操作记录 */
    List<LogVO> getLatest(String moduleCode, List<?> recordIds);

}
