package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.mybatis.dynamic.MybatisDynamicUtils;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

/**
 * @author xiayx
 */
@Configuration
@EnableConfigurationProperties(MybatisLogProperties.class)
@MapperScan(basePackageClasses = MybatisLogAutoConfiguration.class, annotationClass = Mapper.class)
public class MybatisLogAutoConfiguration {


    public MybatisLogAutoConfiguration(MybatisLogProperties properties) {
        Optional.ofNullable(properties.getTableNames().getLog()).ifPresent(value -> {
            MybatisDynamicUtils.setTableName(LogDynamicSqlSupport.log, value);
        });
    }

    @Bean
    @ConditionalOnMissingBean(LogService.class)
    public LogService peacetrueLogService() {
        return new LogServiceImpl();
    }

}
