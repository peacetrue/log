package com.github.peacetrue.log;

import reactor.core.publisher.Mono;

/**
 * @author xiayx
 */
public interface UserService {
    Mono<User> add(User user);

    Mono<User> modify(User user);
}
