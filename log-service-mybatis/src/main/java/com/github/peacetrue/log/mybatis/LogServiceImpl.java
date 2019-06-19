package com.github.peacetrue.log.mybatis;

import com.github.pagehelper.PageHelper;
import com.github.peacetrue.log.service.Log;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.QueryParams;
import com.github.peacetrue.mybatis.LimitAndOffsetAdapter;
import com.github.peacetrue.mybatis.dynamic.sql.GroupConcat;
import com.google.common.base.CaseFormat;
import com.google.common.base.Converter;
import org.mybatis.dynamic.sql.SortSpecification;
import org.mybatis.dynamic.sql.SqlBuilder;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.render.RenderingStrategy;
import org.mybatis.dynamic.sql.select.SelectDSL;
import org.mybatis.dynamic.sql.select.SimpleSortSpecification;
import org.mybatis.dynamic.sql.select.render.SelectStatementProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.github.peacetrue.log.mybatis.LogDynamicSqlSupport.log;

/**
 * @author xiayx
 */
public class LogServiceImpl<T extends Log> implements LogService<T> {

    private Logger logger = LoggerFactory.getLogger(getClass());
    private static final Converter<String, String> PROPERTY_TO_COLUMN = CaseFormat.LOWER_CAMEL.converterTo(CaseFormat.LOWER_UNDERSCORE);

    @Autowired
    private LogMapper<T> logMapper;

    public T add(T log) {
        logger.info("新增日志: {}", log);
        log.setCreatedTime(new Date());
        int count = logMapper.insert(log);
        logger.debug("共影响{}行记录", count);
        return log;
    }

    @Override
    public Page<T> query(QueryParams params, Pageable pageable) {
        logger.info("分页查询日志信息");
        logger.debug("params: {}, pageable: {}", params, pageable);

        if (params == null) params = new QueryParams();
        PageHelper.startPage(pageable.getPageNumber() + 1, pageable.getPageSize());
        List<T> entities = logMapper.selectMany(params, this.toSortSpecifications(pageable.getSort()));
        logger.debug("共取得'{}'条记录", entities.size());

        if (entities.isEmpty()) return new PageImpl<>(Collections.emptyList());
        return new PageImpl<>(entities, pageable, ((com.github.pagehelper.Page) entities).getTotal());
    }

    @Override
    @SuppressWarnings("unchecked")
    public T getLatest(String moduleCode, Object recordId) {
        logger.info("获取[{}-{}]最近的操作记录", moduleCode, recordId);
        return SelectDSL.select(
                selectModel -> LimitAndOffsetAdapter.lastOne(selectModel, logMapper::selectMany),
                SqlColumn.of("*", log))
                .from(log)
                .where(log.moduleCode, SqlBuilder.isEqualTo(moduleCode))
                .and((SqlColumn<Object>) log.recordId, SqlBuilder.isEqualTo(recordId))
                .orderBy(log.createdTime.descending())
                .build().execute().stream().reduce(null, (l, r) -> r);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<T> getLatest(String moduleCode, List<?> recordIds) {
        logger.info("获取[{}-{}]最近的操作记录", moduleCode, recordIds);
        GroupConcat groupConcat = GroupConcat.of(log.id);
        SelectStatementProvider provider = SqlBuilder.select(groupConcat.withSort(log.createdTime.descending()))
                .from(log)
                .where(log.moduleCode, SqlBuilder.isEqualTo(moduleCode))
                .and((SqlColumn<Object>) log.recordId, SqlBuilder.isIn((List<Object>) recordIds))
                .groupBy(log.moduleCode, log.recordId)
                .build().render(RenderingStrategy.MYBATIS3);
        List<String> ids = logMapper.genericSelectMany(provider);
        logger.debug("取得所有日志主键: {}", ids);
        if (ids.isEmpty()) return Collections.emptyList();

        List<Object> groupedIds = ids.stream().map(groupConcat::getFirstValue).collect(Collectors.toList());
        logger.debug("取得分组后的日志主键: {}", ids);

        provider = SqlBuilder.select(SqlColumn.of("*", log))
                .from(log).where((SqlColumn<Object>) log.id, SqlBuilder.isIn(groupedIds))
                .build().render(RenderingStrategy.MYBATIS3);
        return logMapper.selectMany(provider);
    }

    private SortSpecification[] toSortSpecifications(Sort sort) {
        if (sort == null) return new SortSpecification[]{};
        return StreamSupport.stream(sort.spliterator(), false)
                .map(this::toSortSpecification).toArray(SortSpecification[]::new);
    }

    private SortSpecification toSortSpecification(Sort.Order order) {
        String name = Objects.requireNonNull(PROPERTY_TO_COLUMN.convert(order.getProperty()));
        SortSpecification specification = SimpleSortSpecification.of(name);
        if (order.isDescending()) specification = specification.descending();
        return specification;
    }
}
