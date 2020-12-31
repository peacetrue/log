package com.github.peacetrue.log;

import com.github.peacetrue.log.aspect.LogPointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


/**
 * @author xiayx
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private R2dbcEntityOperations entityOperations;

    //tag::class[]
    @LogPointcut(moduleCode = "User", recordId = "#p0.id", operateCode = "add", description = "新增用户#{#p0.name}", creatorId = "#{#returning?.id}")
    public Mono<User> add(User user) {
        //#p0引用方法的第一个参数，#p0.id获取用户的主键
        return entityOperations.insert(user);
    }
    //end::class[]

    @Override
    public Mono<User> modify(User user) {
        return entityOperations.update(user);

    }
}
