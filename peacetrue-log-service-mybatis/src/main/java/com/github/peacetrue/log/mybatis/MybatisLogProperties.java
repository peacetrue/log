package com.github.peacetrue.log.mybatis;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "peacetrue.log")
public class MybatisLogProperties {

    private TableNames tableNames = new TableNames();

    @Data
    public static class TableNames {
        private String log = "log";
    }

}
