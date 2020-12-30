package com.github.peacetrue.log;

import com.github.peacetrue.core.IdCapable;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 日志表实体类
 *
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Log implements Serializable, IdCapable<Long> {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @Id
    private Long id;
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
    private LocalDateTime createdTime;

}
