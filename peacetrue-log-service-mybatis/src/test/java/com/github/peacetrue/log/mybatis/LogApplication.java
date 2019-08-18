package com.github.peacetrue.log.mybatis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * @author xiayx
 */
@SpringBootApplication
public class LogApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(LogApplication.class, args);
        LogMapper bean = run.getBean(LogMapper.class);
        System.out.println(bean);
    }
}
