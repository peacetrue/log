package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.service.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 抽象的日志构建器
 *
 * @author xiayx
 */
public abstract class AbstractLogBuilder implements LogBuilder {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    @SuppressWarnings("unchecked")
    public Log build(LogPointcutInfo logPointcutInfo, LogEvaluationContext context) {
        logger.info("使用日志表达式取值上下文[{}]构建日志", context);
        Log log = instance(context);
        log.setModuleCode(parseModuleCode(context, logPointcutInfo.getModuleCode()));
        log.setRecordId(parseRecordId(context, logPointcutInfo.getRecordId()));
        log.setOperateCode(parseOperateCode(context, logPointcutInfo.getOperateCode()));
        log.setDescription(parseDescription(context, logPointcutInfo.getDescription()));
        log.setCreatorId(parseCreatorId(context, logPointcutInfo.getCreatorId()));
        return log;
    }

    /** 实例化日志 */
    protected abstract Log instance(LogEvaluationContext context);

    /** 解析模块编码 */
    protected abstract String parseModuleCode(LogEvaluationContext context, String expression);

    /** 解析记录主键 */
    protected abstract Object parseRecordId(LogEvaluationContext context, String expression);

    /** 解析操作编码 */
    protected abstract String parseOperateCode(LogEvaluationContext context, String expression);

    /** 解析操作描述 */
    protected abstract String parseDescription(LogEvaluationContext context, String expression);

    /** 解析创建者主键 */
    protected abstract Object parseCreatorId(LogEvaluationContext context, String expression);

}
