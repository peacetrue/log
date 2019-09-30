package com.github.peacetrue.log.mybatis;

import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.dynamic.sql.SqlBuilder;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.delete.DeleteDSL;
import org.mybatis.dynamic.sql.delete.MyBatis3DeleteModelAdapter;
import org.mybatis.dynamic.sql.delete.render.DeleteStatementProvider;
import org.mybatis.dynamic.sql.insert.render.InsertStatementProvider;
import org.mybatis.dynamic.sql.render.RenderingStrategy;
import org.mybatis.dynamic.sql.select.MyBatis3SelectModelAdapter;
import org.mybatis.dynamic.sql.select.QueryExpressionDSL;
import org.mybatis.dynamic.sql.select.SelectDSL;
import org.mybatis.dynamic.sql.select.render.SelectStatementProvider;
import org.mybatis.dynamic.sql.update.MyBatis3UpdateModelAdapter;
import org.mybatis.dynamic.sql.update.UpdateDSL;
import org.mybatis.dynamic.sql.update.render.UpdateStatementProvider;
import org.mybatis.dynamic.sql.util.SqlProviderAdapter;

import javax.annotation.Generated;
import java.util.List;

import static com.github.peacetrue.log.mybatis.LogDynamicSqlSupport.*;
import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;

@Mapper
@SuppressWarnings("unchecked")
public interface LogMapper {

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    long count(SelectStatementProvider selectStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @DeleteProvider(type = SqlProviderAdapter.class, method = "delete")
    int delete(DeleteStatementProvider deleteStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @InsertProvider(type = SqlProviderAdapter.class, method = "insert")
    @Options(useGeneratedKeys = true, keyProperty = "record.id")
    int insert(InsertStatementProvider<Log> insertStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    @ResultMap("LogResult")
    Log selectOne(SelectStatementProvider selectStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    @Results(id = "LogResult", value = {
            @Result(column = "id", property = "id", id = true),
            @Result(column = "module_code", property = "moduleCode", jdbcType = JdbcType.VARCHAR),
            @Result(column = "record_id", property = "recordId"),
            @Result(column = "operate_code", property = "operateCode", jdbcType = JdbcType.VARCHAR),
            @Result(column = "description", property = "description", jdbcType = JdbcType.VARCHAR),
            @Result(column = "input", property = "input"),
            @Result(column = "output", property = "output"),
            @Result(column = "duration", property = "duration", jdbcType = JdbcType.INTEGER),
            @Result(column = "exception", property = "exception", jdbcType = JdbcType.VARCHAR),
            @Result(column = "creator_id", property = "creatorId"),
            @Result(column = "created_time", property = "createdTime", jdbcType = JdbcType.TIMESTAMP)
    })
    List<Log> selectMany(SelectStatementProvider selectStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    @UpdateProvider(type = SqlProviderAdapter.class, method = "update")
    int update(UpdateStatementProvider updateStatement);

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default QueryExpressionDSL<MyBatis3SelectModelAdapter<Long>> countByExample() {
        return SelectDSL.selectWithMapper(this::count, SqlBuilder.count())
                .from(log);
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default DeleteDSL<MyBatis3DeleteModelAdapter<Integer>> deleteByExample() {
        return DeleteDSL.deleteFromWithMapper(this::delete, log);
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int deleteByPrimaryKey(Object id_) {
        return DeleteDSL.deleteFromWithMapper(this::delete, log)
                .where((SqlColumn<Object>) id, isEqualTo(id_))
                .build()
                .execute();
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int insert(Log record) {
        return insert(SqlBuilder.insert(record)
                .into(log)
                .map(id).toProperty("id")
                .map(moduleCode).toProperty("moduleCode")
                .map(recordId).toProperty("recordId")
                .map(operateCode).toProperty("operateCode")
                .map(description).toProperty("description")
                .map(input).toProperty("input")
                .map(output).toProperty("output")
                .map(exception).toProperty("exception")
                .map(creatorId).toProperty("creatorId")
                .map(createdTime).toProperty("createdTime")
                .map(duration).toProperty("duration")
                .build()
                .render(RenderingStrategy.MYBATIS3));
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int insertSelective(Log record) {
        return insert(SqlBuilder.insert(record)
                .into(log)
                .map(id).toPropertyWhenPresent("id", record::getId)
                .map(moduleCode).toPropertyWhenPresent("moduleCode", record::getModuleCode)
                .map(recordId).toPropertyWhenPresent("recordId", record::getRecordId)
                .map(operateCode).toPropertyWhenPresent("operateCode", record::getOperateCode)
                .map(description).toPropertyWhenPresent("description", record::getDescription)
                .map(input).toPropertyWhenPresent("input", record::getInput)
                .map(output).toPropertyWhenPresent("output", record::getOutput)
                .map(exception).toPropertyWhenPresent("exception", record::getException)
                .map(duration).toPropertyWhenPresent("duration", record::getDuration)
                .map(creatorId).toPropertyWhenPresent("creatorId", record::getCreatorId)
                .map(createdTime).toPropertyWhenPresent("createdTime", record::getCreatedTime)
                .build()
                .render(RenderingStrategy.MYBATIS3));
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default QueryExpressionDSL<MyBatis3SelectModelAdapter<List<Log>>> selectByExample() {
        return SelectDSL.selectWithMapper(this::selectMany, id, moduleCode, recordId, operateCode, description, input, output, exception, creatorId, createdTime, duration)
                .from(log);
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default QueryExpressionDSL<MyBatis3SelectModelAdapter<List<Log>>> selectDistinctByExample() {
        return SelectDSL.selectDistinctWithMapper(this::selectMany, id, moduleCode, recordId, operateCode, description, input, output, exception, creatorId, createdTime, duration)
                .from(log);
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default Log selectByPrimaryKey(Object id_) {
        return SelectDSL.selectWithMapper(this::selectOne, id, moduleCode, recordId, operateCode, description, input, output, exception, creatorId, createdTime, duration)
                .from(log)
                .where((SqlColumn<Object>) id, isEqualTo(id_))
                .build()
                .execute();
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default UpdateDSL<MyBatis3UpdateModelAdapter<Integer>> updateByExample(Log record) {
        return UpdateDSL.updateWithMapper(this::update, log)
                .set((SqlColumn<Object>) id).equalTo(record::getId)
                .set(moduleCode).equalTo(record::getModuleCode)
                .set((SqlColumn<Object>) recordId).equalTo(record::getRecordId)
                .set(operateCode).equalTo(record::getOperateCode)
                .set(description).equalTo(record::getDescription)
                .set((SqlColumn<Object>) input).equalTo(record::getInput)
                .set((SqlColumn<Object>) output).equalTo(record::getOutput)
                .set((SqlColumn<Object>) exception).equalTo(record::getException)
                .set(duration).equalTo(record::getDuration)
                .set((SqlColumn<Object>) creatorId).equalTo(record::getCreatorId)
                .set(createdTime).equalTo(record::getCreatedTime);
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default UpdateDSL<MyBatis3UpdateModelAdapter<Integer>> updateByExampleSelective(Log record) {
        return UpdateDSL.updateWithMapper(this::update, log)
                .set(id).equalToWhenPresent(record::getId)
                .set(moduleCode).equalToWhenPresent(record::getModuleCode)
                .set(recordId).equalToWhenPresent(record::getRecordId)
                .set(operateCode).equalToWhenPresent(record::getOperateCode)
                .set(description).equalToWhenPresent(record::getDescription)
                .set(input).equalToWhenPresent(record::getInput)
                .set(output).equalToWhenPresent(record::getOutput)
                .set(exception).equalToWhenPresent(record::getException)
                .set(duration).equalToWhenPresent(record::getDuration)
                .set(creatorId).equalToWhenPresent(record::getCreatorId)
                .set(createdTime).equalToWhenPresent(record::getCreatedTime)
                ;
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int updateByPrimaryKey(Log record) {
        return UpdateDSL.updateWithMapper(this::update, log)
                .set(moduleCode).equalTo(record::getModuleCode)
                .set((SqlColumn<Object>) recordId).equalTo(record::getRecordId)
                .set(operateCode).equalTo(record::getOperateCode)
                .set(description).equalTo(record::getDescription)
                .set((SqlColumn<Object>) input).equalTo(record::getInput)
                .set((SqlColumn<Object>) output).equalTo(record::getOutput)
                .set((SqlColumn<Object>) exception).equalTo(record::getException)
                .set((SqlColumn<Object>) creatorId).equalTo(record::getCreatorId)
                .set(createdTime).equalTo(record::getCreatedTime)
                .set(duration).equalTo(record::getDuration)
                .where((SqlColumn<Object>) id, isEqualTo(record::getId))
                .build()
                .execute();
    }

    @Generated("org.mybatis.generator.api.MyBatisGenerator")
    default int updateByPrimaryKeySelective(Log record) {
        return UpdateDSL.updateWithMapper(this::update, log)
                .set(moduleCode).equalToWhenPresent(record::getModuleCode)
                .set((SqlColumn<Object>) recordId).equalToWhenPresent(record::getRecordId)
                .set(operateCode).equalToWhenPresent(record::getOperateCode)
                .set(description).equalToWhenPresent(record::getDescription)
                .set((SqlColumn<Object>) input).equalToWhenPresent(record::getInput)
                .set((SqlColumn<Object>) output).equalToWhenPresent(record::getOutput)
                .set((SqlColumn<Object>) exception).equalToWhenPresent(record::getException)
                .set((SqlColumn<Object>) creatorId).equalToWhenPresent(record::getCreatorId)
                .set(createdTime).equalToWhenPresent(record::getCreatedTime)
                .set(duration).equalToWhenPresent(record::getDuration)
                .where((SqlColumn<Object>) id, isEqualTo(record::getId))
                .build()
                .execute();
    }
}