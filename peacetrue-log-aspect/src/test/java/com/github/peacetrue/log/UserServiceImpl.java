package com.github.peacetrue.log;

import com.github.peacetrue.log.aspect.LogPointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


/**
 * @author xiayx
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //tag::class[]
    @LogPointcut(moduleCode = "User", recordId = "#p0.id", operateCode = "add", description = "新增用户#{#p0.name}", creatorId = "#{#p0.name}")
    public int add(User user) {
        //#p0引用方法的第一个参数，#p0.id获取用户的主键
        return jdbcTemplate.update(
                "insert into user (name,password) values (?, ?)",
                user.getName(), user.getPassword());
    }
    //end::class[]

    @Override
    public int modify(User user) {
        return jdbcTemplate.update(
                "update user set name=?, password=? where id=?",
                user.getName(), user.getPassword(), user.getId());

    }
}
