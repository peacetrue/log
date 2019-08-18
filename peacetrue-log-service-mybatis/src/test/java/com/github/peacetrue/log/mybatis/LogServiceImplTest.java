package com.github.peacetrue.log.mybatis;

import com.github.pagehelper.autoconfigure.PageHelperAutoConfiguration;
import org.junit.runner.RunWith;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author xiayx
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        DataSourceAutoConfiguration.class,
        DataSourceTransactionManagerAutoConfiguration.class,
        MybatisAutoConfiguration.class,
        MybatisLogAutoConfiguration.class,
        PageHelperAutoConfiguration.class,
        SerializeServiceBeanDefinitionRegistryPostProcessor.class,
})
@ActiveProfiles("datasource")
public class LogServiceImplTest {

}