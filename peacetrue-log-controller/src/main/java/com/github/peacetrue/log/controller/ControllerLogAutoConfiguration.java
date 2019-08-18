package com.github.peacetrue.log.controller;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @author xiayx
 */
@Configuration
@EnableConfigurationProperties(ControllerLogProperties.class)
@PropertySource("classpath:peacetrue-log-controller.properties")
public class ControllerLogAutoConfiguration {

    @Bean
    public LogController peacetrueLogController() {
        return new LogController();
    }

}
