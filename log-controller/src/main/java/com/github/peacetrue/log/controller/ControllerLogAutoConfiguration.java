package com.github.peacetrue.log.controller;

import com.github.peacetrue.web.method.support.ConcreteClassArgumentResolver;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;
import java.util.Objects;

/**
 * @author xiayx
 */
@Configuration
@EnableConfigurationProperties(ControllerLogProperties.class)
public class ControllerLogAutoConfiguration {

    private ControllerLogProperties logProperties;

    public ControllerLogAutoConfiguration(ControllerLogProperties logProperties) {
        this.logProperties = Objects.requireNonNull(logProperties);
    }

    @Bean("peacetrueLogController")
    public LogController logController() {
        return new LogController();
    }

    @Bean("peacetrueLogWebMvcConfigurer")
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
                argumentResolvers.add(new ConcreteClassArgumentResolver(logProperties.getQueryParamsClass()));
            }
        };
    }
}
