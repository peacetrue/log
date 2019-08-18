DROP TABLE IF EXISTS log;
CREATE TABLE log
(
    id           BIGINT AUTO_INCREMENT NOT NULL COMMENT '主键',
    module_code  VARCHAR(63)           NOT NULL COMMENT '模块编码',
    record_id    VARCHAR(63) COMMENT '记录主键',
    operate_code VARCHAR(63)           NOT NULL COMMENT '操作编码',
    description  VARCHAR(255)          NOT NULL COMMENT '操作描述',
    duration     LONG                  NOT NULL COMMENT '耗时(毫秒)',
    input        varbinary(16384) COMMENT '输入参数(2M)',
    output       varbinary(16384) COMMENT '输出结果(2M)',
    exception    varbinary(16384) COMMENT '异常信息(2M)',
    creator_id   VARCHAR(63)           NOT NULL COMMENT '创建者主键',
    created_time DATETIME              NOT NULL COMMENT '创建时间',
    primary key (id)
) comment '日志表';