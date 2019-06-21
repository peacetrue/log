package com.github.peacetrue.log.sample;

import com.github.peacetrue.log.aspect.AspectLogAutoConfiguration;
import com.github.peacetrue.log.mybatis.MybatisLogAutoConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        DataSourceAutoConfiguration.class,
        JdbcTemplateAutoConfiguration.class,
        TransactionAutoConfiguration.class,
        MybatisAutoConfiguration.class,
        MybatisLogAutoConfiguration.class,
        AspectLogAutoConfiguration.class,
        JacksonAutoConfiguration.class,
        UserServiceImpl.class,
        UserModifyAspect.class
})
@TestPropertySource("classpath:/application.properties")
//@Transactional
public class UserServiceImplTest {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserService userService;

    @Test
    public void add() throws Exception {
        User user = new User();
        user.setName("name");
        user.setPassword("password");
        logger.info("return: {}", userService.add(user));
        Thread.sleep(1000L);
    }

    @Test
    public void modify() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setName("name");
        user.setPassword("password");
        logger.info("return: {}", userService.modify(user));
        Thread.sleep(1000L);

    }
}