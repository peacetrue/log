package com.github.peacetrue.log.type;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author xiayx
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "peacetrue.log")
public class TypeLogProperties {

    private Lengths lengths = new Lengths();

    @Data
    public static class Lengths {
        private Integer input = 2046;
        private Integer output = 2046;
        private Integer exception = 1022;
    }
}
