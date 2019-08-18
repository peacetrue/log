package com.github.peacetrue.log.sample;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

/**
 * @author xiayx
 */
@ControllerAdvice
public class StringTrimmerControllerAdvice {
    @InitBinder
    public void registerCustomEditors(WebDataBinder binder) {
        // configure for empty string change to null
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
    }
}
