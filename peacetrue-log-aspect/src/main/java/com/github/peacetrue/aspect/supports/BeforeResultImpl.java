package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.BeforeResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author xiayx
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BeforeResultImpl<T> implements BeforeResult<T> {

    private Object[] args;
    private T data;

    public BeforeResultImpl(Object[] args) {
        this.args = args;
    }
}
