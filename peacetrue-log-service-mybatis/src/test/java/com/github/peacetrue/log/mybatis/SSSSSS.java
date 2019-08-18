package com.github.peacetrue.log.mybatis;

import com.github.peacetrue.log.service.LogAddDTO;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.serialize.JacksonSerializeAutoConfiguration;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;

/**
 * @author xiayx
 */
@TestPropertySource(properties = "spring.datasource.schema=classpath:schema/schema-h2-ssssss.sql")
@Import({JacksonSerializeAutoConfiguration.class, UUIdGenerator.class})
public class SSSSSS extends LogServiceImplTest {

    //tag::class[]
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
    //end::class[]

}
