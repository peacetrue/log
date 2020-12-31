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
        logger.debug("记录日志信息[{}]", afterParams);
        Object returnValue = logAspectService.addLog(afterParams);
        if (afterParams.getThrowable() != null) throw afterParams.getThrowable();
        return returnValue;
    }

}
