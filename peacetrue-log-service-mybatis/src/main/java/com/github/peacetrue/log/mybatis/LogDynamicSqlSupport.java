package com.github.peacetrue.log.mybatis;

import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.SqlTable;

import javax.annotation.Generated;
import java.sql.JDBCType;
import java.util.Date;

public class LogDynamicSqlSupport {

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static Log log = new Log();

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn id = log.id;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> moduleCode = log.moduleCode;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn recordId = log.recordId;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> operateCode = log.operateCode;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> description = log.description;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<Integer> duration = log.duration;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> input = log.input;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> output = log.output;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<String> exception = log.exception;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn creatorId = log.creatorId;

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static SqlColumn<Date> createdTime = log.createdTime;


    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    public static class Log extends SqlTable {
        public SqlColumn id = column("id");

        public SqlColumn<String> moduleCode = column("module_code", JDBCType.VARCHAR);

        public SqlColumn recordId = column("record_id");

        public SqlColumn<String> operateCode = column("operate_code", JDBCType.VARCHAR);

        public SqlColumn<String> description = column("description", JDBCType.VARCHAR);

        public SqlColumn<Integer> duration = column("duration", JDBCType.INTEGER);

        public SqlColumn<String> input = column("input", JDBCType.VARCHAR);

        public SqlColumn<String> output = column("output", JDBCType.VARCHAR);

        public SqlColumn<String> exception = column("exception", JDBCType.VARCHAR);

        public SqlColumn creatorId = column("creator_id");

        public SqlColumn<Date> createdTime = column("created_time", JDBCType.TIMESTAMP);

        public Log() {
            super("log");
        }
    }
}