package com.github.peacetrue.log.mybatis;

import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.SqlTable;

import javax.annotation.Generated;
import java.sql.JDBCType;
import java.util.Date;

public final class LogDynamicSqlSupport {
    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final Log log = new Log();

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn id = log.id;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn<String> moduleCode = log.moduleCode;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn recordId = log.recordId;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn<String> operateCode = log.operateCode;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn<String> description = log.description;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn input = log.input;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn output = log.output;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn exception = log.exception;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn<Long> duration = log.duration;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn creatorId = log.creatorId;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final SqlColumn<Date> createdTime = log.createdTime;


    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static final class Log extends SqlTable {

        public final SqlColumn id = column("id");

        public final SqlColumn<String> moduleCode = column("module_code", JDBCType.VARCHAR);

        public final SqlColumn recordId = column("record_id");

        public final SqlColumn<String> operateCode = column("operate_code", JDBCType.VARCHAR);

        public final SqlColumn<String> description = column("description", JDBCType.VARCHAR);

        public final SqlColumn input = column("input");

        public final SqlColumn output = column("output");

        public final SqlColumn exception = column("exception");

        public final SqlColumn<Long> duration = column("duration", JDBCType.INTEGER);

        public final SqlColumn creatorId = column("creator_id");

        public final SqlColumn<Date> createdTime = column("created_time", JDBCType.TIMESTAMP);

        public Log() {
            super("log");
        }
    }
}