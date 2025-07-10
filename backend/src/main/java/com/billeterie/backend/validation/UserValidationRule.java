package com.billeterie.backend.validation;

import com.billeterie.backend.model.User;

public interface UserValidationRule {
    boolean isValid(User user);
}
