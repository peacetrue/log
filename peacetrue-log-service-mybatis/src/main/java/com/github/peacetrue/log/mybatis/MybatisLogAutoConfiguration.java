package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.log.service.LogService;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author xiayx
 */
@Configuration
@MapperScan(basePackageClasses = MybatisLogAutoConfiguration.class, annotationClass = Mapper.class)
public class MybatisLogAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(LogService.class)
    public LogService logService() {
        return new LogServiceImpl();
    }

}
