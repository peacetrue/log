package com.github.peacetrue.log.mybatis;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/** 日志信息 */
@Data
public class Log<Id, RecordId, Input, Output, Exception, CreatorId> implements Serializable {

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
    /** 输入参数 */
    private Input input;
    /** 输出结果 */
    private Output output;
    /** 异常信息 */
    private Exception exception;
    /** 操作耗时（毫秒） */
    private Long duration;
    /** 创建者 */
    private CreatorId creatorId;
    /** 创建时间 */
    private Date createdTime;

}