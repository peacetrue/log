package com.github.peacetrue.web.method.support;

import org.springframework.beans.BeanUtils;
import org.springframework.core.MethodParameter;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.validation.DataBinder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ServletModelAttributeMethodProcessor;

import java.util.Objects;

/**
 * @author xiayx
 */
public class ConcreteClassArgumentResolver extends ServletModelAttributeMethodProcessor {

    private Class<?> concreteClass;

    public ConcreteClassArgumentResolver(Class<?> concreteClass) {
        super(false);
        this.concreteClass = Objects.requireNonNull(concreteClass);
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return !BeanUtils.isSimpleProperty(parameter.getParameterType())
                && parameter.getParameterType().isAssignableFrom(concreteClass);
    }

    @Override
    protected Object createAttributeFromRequestValue(String sourceValue, String attributeName, MethodParameter parameter, WebDataBinderFactory binderFactory, NativeWebRequest request) throws Exception {
        DataBinder binder = binderFactory.createBinder(request, null, attributeName);
        ConversionService conversionService = binder.getConversionService();
        if (conversionService != null) {
            TypeDescriptor source = TypeDescriptor.valueOf(String.class);
            TypeDescriptor target = new TypeDescriptor(parameter);
            if (conversionService.canConvert(source, target)) {
                return binder.convertIfNecessary(sourceValue, concreteClass, parameter);
            }
        }
        return null;
    }
}
