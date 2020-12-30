package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.LogAdd;
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

    private final ExpressionParser expressionParser;
    private Class<? extends LogAdd> logClass;

    public DefaultLogBuilder(Class<? extends LogAdd> logClass, ExpressionParser expressionParser) {
        this.logClass = logClass;
        this.expressionParser = Objects.requireNonNull(expressionParser);
    }

    @Override
    protected LogAdd instance(LogEvaluationContext context) {
        return BeanUtils.instantiateClass(logClass);
    }

    @Override
    protected String parseModuleCode(LogEvaluationContext context, String expression) {
        return StringUtils.isEmpty(expression)
                ? context.getTarget().getClass().getAnnotation(Module.class).code()
                : expression;
    }

    @Override
    protected Long parseRecordId(LogEvaluationContext context, String expression) {
        if (StringUtils.isEmpty(expression)) return null;
        return expressionParser.parseExpression(expression).getValue(context, Long.class);
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
    protected Long parseCreatorId(LogEvaluationContext context, String expression) {
        return expressionParser.parseExpression(expression, ParserContext.TEMPLATE_EXPRESSION).getValue(context, Long.class);
    }
}
