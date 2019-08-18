package com.github.peacetrue.log.controller;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Optional;

/**
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "peacetrue.log")
public class ControllerLogProperties {

    private Urls urls = new Urls();

    @Getter
    @Setter
    public static class Urls {
        private String module = "/logs";
        private String query;

        public String getQuery() {
            return Optional.ofNullable(query).orElse(module);
        }
    }

}