
DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    id       BIGINT AUTO_INCREMENT NOT NULL COMMENT '主键',
    name     VARCHAR(63)           NOT NULL COMMENT '模块编码',
    password VARCHAR(63) COMMENT '记录主键',
    primary key (id)
);

