package com.github.peacetrue.log;

import com.github.peacetrue.core.OperatorCapableImpl;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LogAdd extends OperatorCapableImpl<Long> {

    private static final long serialVersionUID = 0L;

    /** 模块编码 */
    @NotNull
    @Size(min = 1, max = 63)
    private String moduleCode;
    /** 记录主键 */
    private Long recordId;
    /** 操作编码 */
    @NotNull
    @Size(min = 1, max = 63)
    private String operateCode;
    /** 操作描述 */
    @NotNull
    @Size(min = 1, max = 255)
    private String description;
    /** 耗时(毫秒) */
    @NotNull
    private Long duration;
    /** 输入参数 */
    @Size(min = 1, max = 2046)
    private String input;
    /** 输出结果 */
    @Size(min = 1, max = 2046)
    private String output;
    /** 异常信息 */
    @Size(min = 1, max = 1022)
    private String exception;

}
