package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.service.LogAddDTO;
import com.github.peacetrue.metadata.Module;
import org.springframework.beans.BeanUtils;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.ParserContext;
import org.springframework.util.StringUtils;

import java.util.Objects;

/**
 * 默认的日志构建器
 *
 * @author xiayx
 */
public class DefaultLogBuilder extends AbstractLogBuilder {

    private Class<? extends LogAddDTO> logClass;
    private Class<?> recordIdType;
    private Class<?> creatorIdType;
    private ExpressionParser expressionParser;

    public DefaultLogBuilder(Class<? extends LogAddDTO> logClass, ExpressionParser expressionParser) {
        this.setLogClass(logClass);
        this.expressionParser = Objects.requireNonNull(expressionParser);
    }

    public void setLogClass(Class<? extends LogAddDTO> logClass) {
        this.logClass = Objects.requireNonNull(logClass);
        this.recordIdType = BeanUtils.getPropertyDescriptor(logClass, "recordId").getPropertyType();
        this.creatorIdType = BeanUtils.getPropertyDescriptor(logClass, "operatorId").getPropertyType();
    }

    @Override
    protected LogAddDTO instance(LogEvaluationContext context) {
        return BeanUtils.instantiate(logClass);
    }

    @Override
    protected String parseModuleCode(LogEvaluationContext context, String expression) {
        return StringUtils.isEmpty(expression)
                ? context.getTarget().getClass().getAnnotation(Module.class).code()
                : expression;
    }

    @Override
    protected Object parseRecordId(LogEvaluationContext context, String expression) {
        if (StringUtils.isEmpty(expression)) return null;
        return expressionParser.parseExpression(expression).getValue(context, recordIdType);
    }

    @Override
    protected String parseOperateCode(LogEvaluationContext context, String expression) {
        return expressionParser.parseExpression(expression, ParserContext.TEMPLATE_EXPRESSION).getValue(context, String.class);
    }

    @Override
    protected String parseDescription(LogEvaluationContext context, String expression) {
        return expressionParser.parseExpression(expression, ParserContext.TEMPLATE_EXPRESSION).getValue(context, String.class);
    }

    @Override
    protected Object parseCreatorId(LogEvaluationContext context, String expression) {
        return expressionParser.parseExpression(expression, ParserContext.TEMPLATE_EXPRESSION).getValue(context, creatorIdType);
    }
}
