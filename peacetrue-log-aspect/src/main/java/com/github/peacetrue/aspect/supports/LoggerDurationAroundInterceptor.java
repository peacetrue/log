package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AfterParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import java.util.Objects;

/**
 * @author xiayx
 */
public class LoggerDurationAroundInterceptor extends DurationAroundInterceptor {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Nullable
    @Override
    public Object afterProceed(AfterParams<Long> afterParams) throws Throwable {
        logger.debug("方法[{}]耗时{}毫秒",
                afterParams.getAroundParams().getProceedingJoinPoint().getSignature().toShortString(),
                getDuration(Objects.requireNonNull(afterParams.getData())));
        return super.afterProceed(afterParams);
    }
}
