package com.github.peacetrue.metadata;

import java.lang.annotation.*;

/**
 * 模块
 *
 * @author xiayx
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Module {

    /** 模块编码 */
    String code();

}