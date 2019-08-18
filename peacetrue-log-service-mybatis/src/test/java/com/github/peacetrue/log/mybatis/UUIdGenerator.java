package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.id.IdGenerator;
import com.github.peacetrue.util.UUIDUtils;

/**
 * @author xiayx
 */
public class UUIdGenerator implements IdGenerator<String> {
    @Override
    public String generateId() {
        return UUIDUtils.randomUUID();
    }
}
