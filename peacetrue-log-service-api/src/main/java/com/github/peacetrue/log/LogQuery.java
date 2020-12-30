package com.github.peacetrue.log;

import com.github.peacetrue.core.OperatorCapableImpl;
import com.github.peacetrue.core.Range;
import lombok.*;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LogQuery extends OperatorCapableImpl<Long> {

    public static final LogQuery DEFAULT = new LogQuery();

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Long[] id;
    /** 模块编码 */
    private String moduleCode;
    /** 记录主键 */
    private Long recordId;
    /** 操作编码 */
    private String operateCode;
    /** 操作描述 */
    private String description;
    /** 耗时(毫秒) */
    private Long duration;
    /** 输入参数 */
    private String input;
    /** 输出结果 */
    private String output;
    /** 异常信息 */
    private String exception;
    /** 创建者主键 */
    private Long creatorId;
    /** 创建时间 */
    private Range.LocalDateTime createdTime;

    public LogQuery(Long[] id) {
        this.id = id;
    }

}
