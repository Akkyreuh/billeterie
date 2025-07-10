package com.billeterie.backend.validation;

import com.billeterie.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class EmailNotEmptyRule implements UserValidationRule {
    @Override
    public boolean isValid(User user) {
        return user.getEmail() != null && !user.getEmail().isEmpty();
    }
}
