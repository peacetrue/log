package com.github.peacetrue.log.mybatis;

import com.github.pagehelper.autoconfigure.PageHelperAutoConfiguration;
import com.github.peacetrue.log.service.Log;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.QueryParams;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

/**
 * @author xiayx
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        DataSourceAutoConfiguration.class,
        MybatisAutoConfiguration.class,
        MybatisLogAutoConfiguration.class,
        PageHelperAutoConfiguration.class,
})
//@EnableAspectJAutoProxy(proxyTargetClass = true)
public class LogServiceImplTest {

    @Autowired
    private LogService<Log> logService;

    @Test
    public void add() throws Exception {
        Log<Long, String, String> log = new Log<>();
        log.setModuleCode("moduleCode");
        log.setRecordId("recordId");
        log.setOperateCode("operatorCode");
        log.setDescription("description");
        log.setDuration(1000L);
        log.setCreatorId("creatorId");
        System.out.println(logService.add(log));
    }

    @Test
    public void query() throws Exception {
        Page<Log> page = logService.query(new QueryParams(), new PageRequest(0, 10));
        System.out.println(page.getContent());
    }

    @Test
    public void getLatest() throws Exception {
        Log log = logService.getLatest("1", 1);
        System.out.println(log);
    }

    @Test
    public void getLatestList() throws Exception {
        List<Log> logs = logService.getLatest("1", Arrays.asList(1, 2));
        System.out.println(logs.size());
    }
}