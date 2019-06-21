package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AfterParams;
import com.github.peacetrue.aspect.AroundParams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author xiayx
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AfterParamsImpl<T> implements AfterParams<T> {

    private AroundParams aroundParams;
    private T data;
    private Object returnValue;
    private Throwable throwable;

    public AfterParamsImpl(AroundParams aroundParams, T data) {
        this.aroundParams = aroundParams;
        this.data = data;
    }
}
