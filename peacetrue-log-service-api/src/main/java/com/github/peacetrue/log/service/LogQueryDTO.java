package com.github.peacetrue.log.service;

import com.github.peacetrue.core.Range;
import lombok.Data;

import java.io.Serializable;

/**
 * @author xiayx
 */
@Data
public class LogQueryDTO<RecordId, CreatorId> implements Serializable {

    private static final long serialVersionUID = 0L;

    public static final LogQueryDTO DEFAULT = new LogQueryDTO();

    private String moduleCode;
    private RecordId recordId;
    private String operateCode;
    private String description;
    private CreatorId creatorId;
    private Range.Date createdTime = new Range.Date();
}
