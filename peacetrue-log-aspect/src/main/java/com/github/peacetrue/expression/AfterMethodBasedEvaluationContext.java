package com.github.peacetrue.expression;

import lombok.Getter;
import lombok.ToString;
import org.springframework.context.expression.MethodBasedEvaluationContext;
import org.springframework.core.ParameterNameDiscoverer;

import java.lang.reflect.Method;

/**
 * @author xiayx
 */
@Getter
@ToString
public class AfterMethodBasedEvaluationContext extends MethodBasedEvaluationContext {

    private final Object target;
    private final Method method;
    private final Object[] arguments;
    private final Object returning;

    public AfterMethodBasedEvaluationContext(Object rootObject, Method method, Object[] arguments,
                                             ParameterNameDiscoverer parameterNameDiscoverer, Object returning) {
        super(rootObject, method, arguments, parameterNameDiscoverer);
        this.target = rootObject;
        this.method = method;
        this.arguments = arguments;
        this.returning = returning;
    }
}
