package com.github.peacetrue.log.controller;

import com.github.peacetrue.log.service.Log;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.QueryParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * @author xiayx
 */
@RequestMapping
public class LogController {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private LogService<Log> logService;

    @ResponseBody
    @RequestMapping(value = "${peacetrue.log.query-url:/logs}", params = "page")
    public Page<Log> query(QueryParams queryParams,
                           @PageableDefault(sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        logger.info("分页查询日志信息");
        logger.debug("queryParams: {}, pageable: {}", queryParams, pageable);
        return logService.query(copy(queryParams), pageable);
    }

    //dubbo传输时，子类不被服务提供者识别，所以转换成接口的定义类
    private static QueryParams copy(QueryParams queryParams) {
        QueryParams instantiate = BeanUtils.instantiate(QueryParams.class);
        BeanUtils.copyProperties(queryParams, instantiate);
        return instantiate;
    }

    @ResponseBody
    @RequestMapping(value = "${peacetrue.log.query-url:/logs}", params = {"!page", "moduleCode", "recordId"})
    public List<Log> query(QueryParams queryParams, @RequestParam(defaultValue = "100") Integer size) {
        logger.info("获取记录[{}-{}]的日志信息", queryParams.getModuleCode(), queryParams.getRecordId());
        PageRequest pageRequest = new PageRequest(0, size, Sort.Direction.ASC, "createdTime");
        return logService.query(queryParams, pageRequest).getContent();
    }

}
