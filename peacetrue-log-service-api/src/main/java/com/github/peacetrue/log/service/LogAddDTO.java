package com.github.peacetrue.log.service;

import com.github.peacetrue.core.OperatorCapableImpl;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 日志新增DTO
 *
 * @param <RecordId>   the type of {@link #recordId}
 * @param <OperatorId> the type of {@link #getOperatorId()}
 * @author xiayx
 */
@Getter
@Setter
@ToString(callSuper = true)
public class LogAddDTO<RecordId, OperatorId> extends OperatorCapableImpl<OperatorId> {

    private static final long serialVersionUID = 0L;

    /** 模块编码 */
    private String moduleCode;
    /** 记录标识 */
    private RecordId recordId;
    /** 操作编码 */
    private String operateCode;
    /** 操作描述 */
    private String description;
    /** 输入参数 */
    private Object input;
    /** 输出结果 */
    private Object output;
    /** 异常信息 */
    private Object exception;
    /** 操作耗时(毫秒) */
    private Long duration;
}
