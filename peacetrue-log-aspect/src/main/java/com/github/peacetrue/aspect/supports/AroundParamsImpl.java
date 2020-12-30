package com.github.peacetrue.aspect.supports;

import com.github.peacetrue.aspect.AroundParams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @author xiayx
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AroundParamsImpl implements AroundParams {

    private ProceedingJoinPoint proceedingJoinPoint;

}
