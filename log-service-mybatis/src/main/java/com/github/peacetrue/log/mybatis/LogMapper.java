package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.log.service.Log;
import com.github.peacetrue.log.service.QueryParams;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.dynamic.sql.SortSpecification;
import org.mybatis.dynamic.sql.SqlBuilder;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.insert.render.InsertStatementProvider;
import org.mybatis.dynamic.sql.render.RenderingStrategy;
import org.mybatis.dynamic.sql.select.render.SelectStatementProvider;
import org.mybatis.dynamic.sql.util.SqlProviderAdapter;

import javax.annotation.Generated;
import java.util.List;

import static com.github.peacetrue.log.mybatis.LogDynamicSqlSupport.*;

@Mapper
public interface LogMapper<T extends Log> {

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @InsertProvider(type = SqlProviderAdapter.class, method = "insert")
    @Options(useGeneratedKeys = true, keyProperty = "record.id")
    int insert(InsertStatementProvider<Log> insertStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int insert(T record) {
        return insert(SqlBuilder.insert(record)
                .into(log)
                .map(id).toProperty("id")
                .map(moduleCode).toProperty("moduleCode")
                .map(recordId).toProperty("recordId")
                .map(operateCode).toProperty("operateCode")
                .map(description).toProperty("description")
                .map(duration).toProperty("duration")
                .map(input).toProperty("input")
                .map(output).toProperty("output")
                .map(exception).toProperty("exception")
                .map(creatorId).toProperty("creatorId")
                .map(createdTime).toProperty("createdTime")
                .build()
                .render(RenderingStrategy.MYBATIS3));
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    @Results(id = "LogResult", value = {
            @Result(column = "id", property = "id", id = true),
            @Result(column = "module_code", property = "moduleCode", jdbcType = JdbcType.VARCHAR),
            @Result(column = "record_id", property = "recordId"),
            @Result(column = "operate_code", property = "operateCode", jdbcType = JdbcType.VARCHAR),
            @Result(column = "description", property = "description", jdbcType = JdbcType.VARCHAR),
            @Result(column = "input", property = "input", jdbcType = JdbcType.VARCHAR),
            @Result(column = "output", property = "output", jdbcType = JdbcType.VARCHAR),
            @Result(column = "exception", property = "exception", jdbcType = JdbcType.VARCHAR),
            @Result(column = "creator_id", property = "creatorId"),
            @Result(column = "created_time", property = "createdTime", jdbcType = JdbcType.TIMESTAMP),
            @Result(column = "duration", property = "duration", jdbcType = JdbcType.INTEGER)
    })
    List<T> selectMany(SelectStatementProvider selectStatement);

    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    <R> List<R> genericSelectMany(SelectStatementProvider selectStatement);


    @SuppressWarnings("unchecked")
    default List<T> selectMany(QueryParams queryParams, SortSpecification... sortSpecifications) {
        SelectStatementProvider provider = SqlBuilder.select(SqlColumn.of("*", log))
                .from(log).where(moduleCode, SqlBuilder.isLikeWhenPresent(queryParams.getModuleCode()))
                .and((SqlColumn<Object>) recordId, SqlBuilder.isEqualToWhenPresent(queryParams.getRecordId()))
                .and(createdTime, SqlBuilder.isBetweenWhenPresent(queryParams.getCreatedTime().getLowerBound())
                        .and(queryParams.getCreatedTime().getUpperBound()))
                .orderBy(sortSpecifications)
                .build().render(RenderingStrategy.MYBATIS3);
        return selectMany(provider);
    }
}