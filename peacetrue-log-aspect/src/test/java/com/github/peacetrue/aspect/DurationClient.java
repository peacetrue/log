package com.github.peacetrue.aspect;

/**
 * @author xiayx
 */
public class DurationClient {
    public void sleepOneSecond(Integer millis) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
