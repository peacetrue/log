package com.github.peacetrue.log.service;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 日志类
 *
 * @param <Id>        the type of {@link #id}
 * @param <RecordId>  the type of {@link #recordId}
 * @param <CreatorId> the type of {@link #creatorId}
 * @author xiayx
 */
@Data
public class Log<Id, RecordId, CreatorId> implements Serializable {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Id id;
    /** 模块编码 */
    private String moduleCode;
    /** 记录标识 */
    private RecordId recordId;
    /** 操作编码 */
    private String operateCode;
    /** 操作描述 */
    private String description;
    /** 操作耗时 */
    private Long duration;
    /** 输入参数 */
    private String input;
    /** 输出结果 */
    private String output;
    /** 异常信息 */
    private String exception;
    /** 创建者 */
    private CreatorId creatorId;
    /** 创建时间 */
    private Date createdTime;
}
