package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.service.Log;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

/**
 * 日志配置
 *
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "peacetrue.log")
public class AspectLogProperties {

    /** 日志的具体实现类 */
    private Class<? extends Log> concreteClass;
    /** {@link Log#input}的最大长度，默认读取数据库字段的长度 */
    private Integer inputMaxLength = 2046;
    /** {@link Log#output}的最大长度，默认读取数据库字段的长度 */
    private Integer outputMaxLength = 2046;
    /** {@link Log#exception}的最大长度，默认读取数据库字段的长度 */
    private Integer exceptionMaxLength = 1022;
    /** 切面信息配置 */
    private Map<String, LogPointcutInfo> pointcutInfos = new HashMap<>();

}