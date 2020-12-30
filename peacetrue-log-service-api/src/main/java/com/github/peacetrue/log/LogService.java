package com.github.peacetrue.log;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;

/**
 * 日志表服务接口
 *
 * @author xiayx
 */
public interface LogService {

    /** 新增 */
    Mono<LogVO> add(LogAdd params);

    /** 分页查询 */
    Mono<Page<LogVO>> query(@Nullable LogQuery params, @Nullable Pageable pageable, String... projection);

    /** 全量查询 */
    Flux<LogVO> query(LogQuery params, @Nullable Sort sort, String... projection);

    /** 全量查询 */
    default Flux<LogVO> query(LogQuery params, String... projection) {
        return this.query(params, (Sort) null, projection);
    }

    /** 获取 */
    Mono<LogVO> get(LogGet params, String... projection);

    /** 修改 */
    Mono<Integer> modify(LogModify params);

    /** 删除 */
    Mono<Integer> delete(LogDelete params);

}
