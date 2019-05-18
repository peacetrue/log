package com.github.peacetrue.log.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.peacetrue.aspect.AroundInterceptor;
import com.github.peacetrue.aspect.AroundService;
import com.github.peacetrue.aspect.supports.InterceptorAroundService;
import com.github.peacetrue.log.aspect.config.LogPointcutInfoProvider;
import com.github.peacetrue.log.aspect.config.LogPointcutInfoProviderImpl;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.SpelCompilerMode;
import org.springframework.expression.spel.SpelParserConfiguration;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.Objects;
import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;


/**
 * 日志切面配置
 *
 * @author xiayx
 */
@Configuration
@EnableAsync
@EnableAspectJAutoProxy
@EnableConfigurationProperties(AspectLogProperties.class)
public class AspectLogAutoConfiguration {

    public static final String LOG_AROUND_SERVICE_NAME = "logAroundService";
    public static final String LOG_AROUND_INTERCEPTOR_NAME = "logAroundInterceptor";
    public static final String LOG_EXPRESSION_PARSER_NAME = "logExpressionParser";
    public static final String LOG_TASK_EXECUTOR_NAME = "logTaskExecutor";

    private AspectLogProperties properties;

    public AspectLogAutoConfiguration(AspectLogProperties properties) {
        this.properties = Objects.requireNonNull(properties);
    }

    @Bean
    public AnnotationLogAspect logAspect() {
        return new AnnotationLogAspect();
    }

    @Bean(name = LOG_AROUND_SERVICE_NAME)
    @ConditionalOnMissingBean(name = LOG_AROUND_SERVICE_NAME)
    public AroundService logAroundService(AroundInterceptor logAroundInterceptor) {
        return new InterceptorAroundService(logAroundInterceptor);
    }

    @Bean(name = LOG_AROUND_INTERCEPTOR_NAME)
    @ConditionalOnMissingBean(name = LOG_AROUND_INTERCEPTOR_NAME)
    public AroundInterceptor<Long> logAroundInterceptor() {
        return new LogAroundInterceptor();
    }

    @Bean
    @ConditionalOnMissingBean(LogAspectService.class)
    public LogAspectService logAspectService() {
        return new DefaultLogAspectService();
    }

    @Bean
    @ConditionalOnMissingBean(LogBuilder.class)
    public LogBuilder logBuilder(ExpressionParser logExpressionParser) {
        return new DefaultLogBuilder(properties.getConcreteClass(), logExpressionParser);
    }

    @Bean(name = LOG_EXPRESSION_PARSER_NAME)
    @ConditionalOnMissingBean(name = LOG_EXPRESSION_PARSER_NAME)
    public ExpressionParser logExpressionParser() {
        SpelParserConfiguration configuration = new SpelParserConfiguration(
                SpelCompilerMode.IMMEDIATE, null, true, true, Integer.MAX_VALUE);
        return new SpelExpressionParser(configuration);
    }

    @Bean
    @ConditionalOnMissingBean(ObjectMapper.class)
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    /** 日志任务执行器 */
    @Bean(name = LOG_TASK_EXECUTOR_NAME)
    @ConditionalOnMissingBean(name = LOG_TASK_EXECUTOR_NAME)
    public Executor logTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setKeepAliveSeconds(60);
        executor.setThreadNamePrefix("logTaskExecutor-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        return executor;
    }

    @Bean
    @ConditionalOnMissingBean(LogPointcutInfoProvider.class)
    public LogPointcutInfoProvider logPointcutInfoProvider() {
        return new LogPointcutInfoProviderImpl(properties.getPointcutInfos());
    }

}
