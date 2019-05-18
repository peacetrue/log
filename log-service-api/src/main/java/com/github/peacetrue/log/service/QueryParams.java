package com.github.peacetrue.log.service;

import com.github.peacetrue.core.Range;
import lombok.Data;

import java.io.Serializable;

/**
 * @author xiayx
 */
@Data
public class QueryParams<T> implements Serializable {

    private static final long serialVersionUID = 0L;

    private String moduleCode;
    private T recordId;
    private Range.Date createdTime = new Range.Date();
}
