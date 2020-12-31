package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.LogAdd;
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
    private Class<? extends LogAdd> concreteClass = LogAdd.class;
    /** 切面信息配置 */
    private Map<String, LogPointcutInfo> pointcutInfos = new HashMap<>();

}
