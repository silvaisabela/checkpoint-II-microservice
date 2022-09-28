package com.example.email.controllers.response;

import com.example.email.models.Email;
import com.example.email.models.EmailStatus;
import lombok.Data;

import java.time.LocalDateTime;

public @Data
class EmailResponse {
    private String id;
    private String to;
    private String subject;
    private String body;
    private LocalDateTime sentAt;
    private EmailStatus status;

    public EmailResponse(String id, String to, String subject, String body, LocalDateTime sentAt, EmailStatus status) {
        this.id = id;
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.sentAt = sentAt;
        this.status = status;
    }

    public static EmailResponse from(Email email) {
        return new EmailResponse(
                email.getId(),
                email.getTo(),
                email.getSubject(),
                email.getBody(),
                email.getSentAt(),
                email.getStatus()
        );
    }
}
