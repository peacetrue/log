package com.github.peacetrue.log.controller;

import com.github.peacetrue.log.service.QueryParams;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 日志配置
 *
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "peacetrue.log")
public class ControllerLogProperties {

    /** 查询参数的具体实现类 */
    private Class<? extends QueryParams> queryParamsClass;
    /** 查询地址 */
    private String queryUrl = "/logs";
}