package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.log.service.LogAddDTO;
import com.github.peacetrue.log.service.LogQueryDTO;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.LogVO;
import com.github.peacetrue.serialize.JacksonSerializeAutoConfiguration;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.TestPropertySource;

import java.util.Arrays;
import java.util.List;

/**
 * @author xiayx
 */
@TestPropertySource(properties = "spring.datasource.schema=classpath:schema/schema-h2-lsssss.sql")
@Import({JacksonSerializeAutoConfiguration.class})
public class LSSSSS extends LogServiceImplTest {

    @Autowired
    private LogService logService;

    @Test
    public void add() throws Exception {
        LogAddDTO<String, String> log = new LogAddDTO<>();
        log.setModuleCode("User");
        log.setRecordId("1");
        log.setOperateCode("add");
        log.setDescription("新增用户");
        log.setInput(new Object[]{"用户"});
        log.setOutput("用户");
        log.setDuration(1000L);
        log.setOperatorId("admin");
        System.out.println(logService.add(log));
    }

    @Test
    public void query() throws Exception {
        Page<LogVO> page = logService.query(new LogQueryDTO(), new PageRequest(0, 10));
        System.out.println(page.getContent());
    }

    @Test
    public void getLatest() throws Exception {
        LogVO log = logService.getLatest("1", 1);
        System.out.println(log);
    }

    @Test
    public void getLatestList() throws Exception {
        List<LogVO> logs = logService.getLatest("1", Arrays.asList(1, 2));
        System.out.println(logs.size());
    }


}
