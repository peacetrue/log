package com.github.peacetrue.log.aspect;

import lombok.Data;

/**
 * 日志切面信息，与{@link LogPointcut}对应的bean信息
 *
 * @author xiayx
 */
@Data
public class LogPointcutInfo {

    /** 模块编码，对应{@link LogPointcut#moduleCode} */
    private String moduleCode;

    /** 记录主键表达式，对应{@link LogPointcut#recordId} */
    private String recordId;

    /** 操作编码，对应{@link LogPointcut#operateCode} */
    private String operateCode;

    /** 描述表达式，对应{@link LogPointcut#description} */
    private String description;

    /** 创建者表达式，对应{@link LogPointcut#creatorId} */
    private String creatorId;

    /** 从注解转换成Bean */
    public static LogPointcutInfo fromLogPointcut(LogPointcut logPointcut) {
        LogPointcutInfo info = new LogPointcutInfo();
        info.setModuleCode(logPointcut.moduleCode());
        info.setRecordId(logPointcut.recordId());
        info.setOperateCode(logPointcut.operateCode());
        info.setDescription(logPointcut.description());
        info.setCreatorId(logPointcut.creatorId());
        return info;
    }
}
