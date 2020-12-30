package com.github.peacetrue.log;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.OperatorCapable;
import com.github.peacetrue.core.Range;
import com.github.peacetrue.spring.data.relational.core.query.CriteriaUtils;
import com.github.peacetrue.spring.data.relational.core.query.UpdateUtils;
import com.github.peacetrue.spring.util.BeanUtils;
import com.github.peacetrue.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.data.domain.*;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.data.relational.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import javax.annotation.Nullable;
import java.time.LocalDateTime;
import java.util.Collections;

/**
 * 日志表服务实现
 *
 * @author xiayx
 */
@Slf4j
@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private R2dbcEntityOperations entityOperations;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public static Criteria buildCriteria(LogQuery params) {
        return CriteriaUtils.and(
                CriteriaUtils.nullableCriteria(CriteriaUtils.smartIn("id"), params::getId),
                CriteriaUtils.nullableCriteria(Criteria.where("moduleCode")::like, value -> "%" + value + "%", params::getModuleCode),
                CriteriaUtils.nullableCriteria(Criteria.where("recordId")::is, params::getRecordId),
                CriteriaUtils.nullableCriteria(Criteria.where("operateCode")::like, value -> "%" + value + "%", params::getOperateCode),
                CriteriaUtils.nullableCriteria(Criteria.where("description")::like, value -> "%" + value + "%", params::getDescription),
                CriteriaUtils.nullableCriteria(Criteria.where("duration")::is, params::getDuration),
                CriteriaUtils.nullableCriteria(Criteria.where("input")::like, value -> "%" + value + "%", params::getInput),
                CriteriaUtils.nullableCriteria(Criteria.where("output")::like, value -> "%" + value + "%", params::getOutput),
                CriteriaUtils.nullableCriteria(Criteria.where("exception")::like, value -> "%" + value + "%", params::getException),
                CriteriaUtils.nullableCriteria(Criteria.where("creatorId")::is, params::getCreatorId),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::greaterThanOrEquals, params.getCreatedTime()::getLowerBound),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::lessThan, DateUtils.DATE_CELL_EXCLUDE, params.getCreatedTime()::getUpperBound)
        );
    }

    @Override
    @Transactional
    public Mono<LogVO> add(LogAdd params) {
        log.info("新增日志表信息[{}]", params);
        Log entity = BeanUtils.map(params, Log.class);
        entity.setCreatorId(params.getOperatorId());
        entity.setCreatedTime(LocalDateTime.now());
        return entityOperations.insert(entity)
                .map(item -> BeanUtils.map(item, LogVO.class))
                .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)));
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Page<LogVO>> query(LogQuery params, @Nullable Pageable pageable, String... projection) {
        log.info("分页查询日志表信息[{}]", params);
        //if (params == null) params = LogQuery.DEFAULT;
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        Pageable finalPageable = pageable == null ? PageRequest.of(0, 10) : pageable;
        Criteria where = buildCriteria(params);

        return entityOperations.count(Query.query(where), Log.class)
                .flatMap(total -> total == 0L ? Mono.empty() : Mono.just(total))
                .<Page<LogVO>>flatMap(total -> {
                    Query query = Query.query(where).with(finalPageable).sort(finalPageable.getSortOr(Sort.by("createdTime").descending()));
                    return entityOperations.select(query, Log.class)
                            .map(item -> BeanUtils.map(item, LogVO.class))
                            .collectList()
                            .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)))
                            .map(item -> new PageImpl<>(item, finalPageable, total));
                })
                .switchIfEmpty(Mono.just(new PageImpl<>(Collections.emptyList(), finalPageable, 0L)));
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<LogVO> query(LogQuery params, @Nullable Sort sort, String... projection) {
        log.info("全量查询日志表信息[{}]", params);
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        if (sort == null) sort = Sort.by("createdTime").descending();
        Criteria where = buildCriteria(params);
        Query query = Query.query(where).sort(sort).limit(100);
        return entityOperations.select(query, Log.class)
                .map(item -> BeanUtils.map(item, LogVO.class))
                .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)))
                ;
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<LogVO> get(LogGet params, String... projection) {
        log.info("获取日志表信息[{}]", params);
//        Criteria where = CriteriaUtils.and(
//                CriteriaUtils.nullableCriteria(Criteria.where("id")::is, params::getId),
//        );
        Criteria where = Criteria.where("id").is(params.getId());
        return entityOperations.selectOne(Query.query(where), Log.class)
                .map(item -> BeanUtils.map(item, LogVO.class))
                .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)))
                ;
    }

    @Override
    @Transactional
    public Mono<Integer> modify(LogModify params) {
        log.info("修改日志表信息[{}]", params);
        return this.modifyGeneric(params);
    }

    private <T extends IdCapable<Long> & OperatorCapable<Long>> Mono<Integer> modifyGeneric(T params) {
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityOperations.selectOne(idQuery, Log.class)
                .zipWhen(entity -> {
                    Log modify = BeanUtils.map(params, Log.class);
                    Update update = UpdateUtils.selectiveUpdateFromExample(modify);
                    return entityOperations.update(idQuery, update, Log.class);
                })
                .map(tuple2 -> {
                    LogVO vo = BeanUtils.map(tuple2.getT1(), LogVO.class);
                    BeanUtils.copyProperties(params, vo, BeanUtils.EMPTY_PROPERTY_VALUE);
                    eventPublisher.publishEvent(new PayloadApplicationEvent<>(vo, params));
                    return tuple2.getT2();
                })
                .switchIfEmpty(Mono.just(0));
    }

    @Override
    @Transactional
    public Mono<Integer> delete(LogDelete params) {
        log.info("删除日志表信息[{}]", params);
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityOperations.selectOne(idQuery, Log.class)
                .map(item -> BeanUtils.map(item, LogVO.class))
                .zipWhen(region -> entityOperations.delete(idQuery, Log.class))
                .doOnNext(tuple2 -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(tuple2.getT1(), params)))
                .map(Tuple2::getT2)
                .switchIfEmpty(Mono.just(0));
    }

}
