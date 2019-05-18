package com.github.peacetrue.log.sample;

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

    @Override
    @LogPointcut(moduleCode = "user", recordId = "#p0.id", operateCode = "add", description = "新增用户", creatorId = "#{#p0.name}")
    public int add(User user) {
        return jdbcTemplate.update(
                "insert into user (name,password) values (?, ?)",
                user.getName(), user.getPassword());
    }

    @Override
    public int modify(User user) {
        return jdbcTemplate.update(
                "update user set name=?, password=? where id=?",
                user.getName(), user.getPassword(), user.getId());

    }
}
