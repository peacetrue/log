package com.github.peacetrue.log.aspect;

import com.github.peacetrue.expression.AfterMethodBasedEvaluationContext;
import lombok.ToString;
import org.springframework.core.ParameterNameDiscoverer;

import java.lang.reflect.Method;

/**
 * @author xiayx
 */
@ToString(callSuper = true)
public class LogEvaluationContext extends AfterMethodBasedEvaluationContext {

    public LogEvaluationContext(Object rootObject, Method method, Object[] arguments, ParameterNameDiscoverer parameterNameDiscoverer, Object returning) {
        super(rootObject, method, arguments, parameterNameDiscoverer, returning);
    }
}
