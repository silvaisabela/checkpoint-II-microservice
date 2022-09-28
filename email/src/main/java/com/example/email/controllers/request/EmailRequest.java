package com.example.email.controllers.request;

import lombok.Data;

public @Data
class EmailRequest {
    private String to;
    private String subject;
    private String body;
}
