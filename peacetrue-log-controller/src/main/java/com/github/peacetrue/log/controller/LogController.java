package com.github.peacetrue.log.controller;

import com.github.peacetrue.log.service.LogQueryDTO;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.LogVO;
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
    private LogService logService;

    @ResponseBody
    @RequestMapping(value = "${peacetrue.log.urls.query}", params = "page")
    public Page<LogVO> query(LogQueryDTO dto,
                             @PageableDefault(sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        logger.info("分页查询日志信息[{}]", dto);
        return logService.query(copy(dto), pageable);
    }

    //dubbo传输时，子类不被服务提供者识别，所以转换成接口的定义类
    private static LogQueryDTO copy(LogQueryDTO queryParams) {
        LogQueryDTO instantiate = BeanUtils.instantiate(LogQueryDTO.class);
        BeanUtils.copyProperties(queryParams, instantiate);
        return instantiate;
    }

    @ResponseBody
    @RequestMapping(value = "${peacetrue.log.urls.query}", params = {"!page", "moduleCode", "recordId"})
    public List<LogVO> query(LogQueryDTO queryParams, @RequestParam(defaultValue = "100") Integer size) {
        logger.info("获取记录[{}-{}]的日志信息", queryParams.getModuleCode(), queryParams.getRecordId());
        PageRequest pageRequest = new PageRequest(0, size, Sort.Direction.ASC, "createdTime");
        return logService.query(queryParams, pageRequest).getContent();
    }

}
