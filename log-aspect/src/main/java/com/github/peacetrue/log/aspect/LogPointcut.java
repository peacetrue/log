package com.github.peacetrue.log.aspect;

import com.github.peacetrue.log.service.Log;

import java.lang.annotation.*;

/**
 * 日志切点。标注于方法上，表示该方法需要记录日志
 *
 * <pre>
 * public class User{
 *     private String name;
 *     private Long creatorId;
 * }
 *
 * public class UserService {
 *     &nbsp;@LogPointcut(moduleCode="user",recordId="#returning",
 *      operateCode="add",description="新增用户#{#p0.name}",creatorId="#{#p0.creatorId}")
 *      public Long add(User user){
 *
 *      }
 * }
 *
 * </pre>
 *
 * @author xiayx
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
//tag::class[]
public @interface LogPointcut {

    /** 模块编码，对应{@link Log#moduleCode}，例如：user */
    String moduleCode() default "";

    /** 记录主键表达式，对应{@link Log#recordId}，例如：returning */
    String recordId() default "";

    /** 操作编码，对应{@link Log#operateCode}，例如：add */
    String operateCode() default "";

    /** 描述表达式，对应{@link Log#description}，例如：新增用户#{#p0.name} */
    String description();

    /** 创建者表达式，对应{@link Log#creatorId}，例如: #{#p0.operatorId} */
    String creatorId();
}
//end::class[]