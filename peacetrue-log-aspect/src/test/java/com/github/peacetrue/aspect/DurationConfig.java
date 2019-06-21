package com.github.peacetrue.aspect;

import com.github.peacetrue.aspect.supports.InterceptorAroundService;
import com.github.peacetrue.aspect.supports.LoggerDurationAroundInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * @author xiayx
 */
@Configuration
@EnableAspectJAutoProxy
public class DurationConfig {
    @Bean
    public DurationAspect durationAspect() {
        return new DurationAspect();
    }

    @Bean
    public AroundService durationAroundService() {
        return new InterceptorAroundService(new LoggerDurationAroundInterceptor());
    }

    @Bean
    public DurationClient durationClient() {
        return new DurationClient();
    }
}
