package com.billeterie.backend.validation;

import com.billeterie.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserValidator {
    private final List<UserValidationRule> rules;

    public UserValidator(List<UserValidationRule> rules) {
        this.rules = rules;
    }

    public boolean isValid(User user) {
        return rules.stream().allMatch(rule -> rule.isValid(user));
    }
}

