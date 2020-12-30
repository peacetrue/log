package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AroundParams;
import com.github.peacetrue.aspect.BeforeResult;

/**
 * 记录方法耗时
 *
 * @author xiayx
 */
public class DurationAroundInterceptor extends AbstractAroundInterceptor<Long> {

    /** 获取耗时 */
    public static long getDuration(long startedTime) {
        return System.currentTimeMillis() - startedTime;
    }

    @Override
    public BeforeResult<Long> beforeProceed(AroundParams aroundParams) {
        BeforeResultImpl<Long> beforeResult = (BeforeResultImpl<Long>) super.beforeProceed(aroundParams);
        beforeResult.setData(System.currentTimeMillis());
        return beforeResult;
    }

}
