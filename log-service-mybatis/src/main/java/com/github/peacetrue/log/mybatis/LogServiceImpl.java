package com.github.peacetrue.log.mybatis;

import com.github.pagehelper.PageHelper;
import com.github.peacetrue.log.service.Log;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.QueryParams;
import com.google.common.base.CaseFormat;
import com.google.common.base.Converter;
import org.mybatis.dynamic.sql.SortSpecification;
import org.mybatis.dynamic.sql.select.SimpleSortSpecification;
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
import java.util.stream.StreamSupport;

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
