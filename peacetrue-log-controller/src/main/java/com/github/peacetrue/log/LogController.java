package com.github.peacetrue.log;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * 日志表控制器
 *
 * @author xiayx
 */
@Slf4j
@RestController
@RequestMapping(value = "/logs")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<LogVO> addByForm(LogAdd params) {
        log.info("新增日志表信息(请求方法+表单参数)[{}]", params);
        return logService.add(params);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<LogVO> addByJson(@RequestBody LogAdd params) {
        log.info("新增日志表信息(请求方法+JSON参数)[{}]", params);
        return logService.add(params);
    }

    @GetMapping(params = "page")
    public Mono<Page<LogVO>> query(LogQuery params, Pageable pageable, String... projection) {
        log.info("分页查询日志表信息(请求方法+参数变量)[{}]", params);
        return logService.query(params, pageable, projection);
    }

    @GetMapping
    public Flux<LogVO> query(LogQuery params, Sort sort, String... projection) {
        log.info("全量查询日志表信息(请求方法+参数变量)[{}]", params);
        return logService.query(params, sort, projection);
    }

    @GetMapping("/{id}")
    public Mono<LogVO> getByUrlPathVariable(@PathVariable Long id, String... projection) {
        log.info("获取日志表信息(请求方法+路径变量)详情[{}]", id);
        return logService.get(new LogGet(id), projection);
    }

    @RequestMapping("/get")
    public Mono<LogVO> getByPath(LogGet params, String... projection) {
        log.info("获取日志表信息(请求路径+参数变量)详情[{}]", params);
        return logService.get(params, projection);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<Integer> modifyByForm(LogModify params) {
        log.info("修改日志表信息(请求方法+表单参数)[{}]", params);
        return logService.modify(params);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Integer> modifyByJson(@RequestBody LogModify params) {
        log.info("修改日志表信息(请求方法+JSON参数)[{}]", params);
        return logService.modify(params);
    }

    @DeleteMapping("/{id}")
    public Mono<Integer> deleteByUrlPathVariable(@PathVariable Long id) {
        log.info("删除日志表信息(请求方法+URL路径变量)[{}]", id);
        return logService.delete(new LogDelete(id));
    }

    @DeleteMapping(params = "id")
    public Mono<Integer> deleteByUrlParamVariable(LogDelete params) {
        log.info("删除日志表信息(请求方法+URL参数变量)[{}]", params);
        return logService.delete(params);
    }

    @RequestMapping(path = "/delete")
    public Mono<Integer> deleteByPath(LogDelete params) {
        log.info("删除日志表信息(请求路径+URL参数变量)[{}]", params);
        return logService.delete(params);
    }


}
