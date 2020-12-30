package com.github.peacetrue.log;

import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import reactivefeign.spring.config.ReactiveFeignClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;

/**
 * 日志表客户端
 *
 * @author xiayx
 */
@ReactiveFeignClient(name = "peacetrue-log", url = "${peacetrue.Log.url:${peacetrue.server.url:}}")
public interface LogServiceClient {

    @PostMapping(value = "/logs")
    Mono<LogVO> add(LogAdd params);

    @GetMapping(value = "/logs", params = "page")
    Mono<Page<LogVO>> query(@Nullable @SpringQueryMap LogQuery params, @Nullable Pageable pageable, @SpringQueryMap String... projection);

    @GetMapping(value = "/logs", params = "sort")
    Flux<LogVO> query(@SpringQueryMap LogQuery params, Sort sort, @SpringQueryMap String... projection);

    @GetMapping(value = "/logs")
    Flux<LogVO> query(@SpringQueryMap LogQuery params, @SpringQueryMap String... projection);

    @GetMapping(value = "/logs/get")
    Mono<LogVO> get(@SpringQueryMap LogGet params, @SpringQueryMap String... projection);

    @PutMapping(value = "/logs")
    Mono<Integer> modify(LogModify params);

    @DeleteMapping(value = "/logs/delete")
    Mono<Integer> delete(@SpringQueryMap LogDelete params);

}
