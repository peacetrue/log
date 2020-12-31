package com.github.peacetrue.log;

import com.github.peacetrue.log.aspect.AspectLogAutoConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.data.r2dbc.R2dbcTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import reactor.core.scheduler.Schedulers;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
//        DataSourceAutoConfiguration.class,
//        JdbcTemplateAutoConfiguration.class,
//        DataSourceTransactionManagerAutoConfiguration.class,
        R2dbcAutoConfiguration.class,
        R2dbcDataAutoConfiguration.class,
        R2dbcRepositoriesAutoConfiguration.class,
        R2dbcTransactionManagerAutoConfiguration.class,
        ServiceLogAutoConfiguration.class,
        AspectLogAutoConfiguration.class,
        JacksonAutoConfiguration.class,
        UserServiceImpl.class,
        UserModifyAspect.class
})
@EnableAutoConfiguration
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
        userService
                .add(user)
                .subscribeOn(Schedulers.boundedElastic())
                .subscribe()
        ;
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
