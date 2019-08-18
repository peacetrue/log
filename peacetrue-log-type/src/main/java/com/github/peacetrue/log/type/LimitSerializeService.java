package com.github.peacetrue.log.type;

import com.github.peacetrue.jackson.ObjectMapperWrapper;
import com.github.peacetrue.serialize.SerializeService;

import javax.annotation.Nullable;

/**
 * @author xiayx
 */
public class LimitSerializeService implements SerializeService<String> {

    private ObjectMapperWrapper objectMapperWrapper;
    private int length;

    public LimitSerializeService(ObjectMapperWrapper objectMapperWrapper, int length) {
        this.objectMapperWrapper = objectMapperWrapper;
        this.length = length;
    }

    @Nullable
    @Override
    public String serialize(@Nullable Object object) {
        if (object == null) return null;
        String string = object instanceof Throwable ? ((Throwable) object).getMessage() : objectMapperWrapper.writeValueAsString(object);
        return limit(string, length);
    }

    @Nullable
    @Override
    public Object deserialize(@Nullable String source) {
        return source;
    }

    public static String limit(String string, int length) {
        if (string == null) return null;
        return string.length() > length ? string.substring(0, length) : string;
    }
}
