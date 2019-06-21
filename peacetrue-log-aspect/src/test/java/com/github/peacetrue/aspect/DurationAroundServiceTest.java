package com.github.peacetrue.aspect;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author xiayx
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        DurationConfig.class
}, properties = {
        "logging.level.com.github.peacetrue=debug",
})
public class DurationAroundServiceTest {

    @Autowired
    private DurationClient durationClient;

    @Test
    public void sleepOneSecond() {
        durationClient.sleepOneSecond(1);
    }
}