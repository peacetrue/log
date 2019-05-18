package com.github.peacetrue.log.aspect;

import com.github.peacetrue.aspect.AfterParams;
import com.github.peacetrue.aspect.supports.DurationAroundInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Nullable;

/**
 * @author xiayx
 */
public class LogAroundInterceptor extends DurationAroundInterceptor {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private LogAspectService logAspectService;

    @Nullable
    @Override
    public Object afterProceed(AfterParams<Long> afterParams) throws Throwable {
        logger.info("记录日志信息");
        try {
            logAspectService.addLog(afterParams);
        } catch (Throwable e) {
            logger.error("添加日志异常", e);
        }
        return super.afterProceed(afterParams);
    }

}
