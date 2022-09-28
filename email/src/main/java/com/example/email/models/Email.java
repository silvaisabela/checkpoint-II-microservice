package com.example.email.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public @Data class Email {

    @Id
    private String id;
    private String from;
    private String to;
    private String subject;
    private String body;
    private LocalDateTime sentAt;
    private EmailStatus status;

    public Email() {
    }

    public Email(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    public void markAsSent(String from) {
        setFrom(from);
        setSentAt(LocalDateTime.now());
        setStatus(EmailStatus.SENT);
    }

    public void markAsError(){
        setStatus(EmailStatus.ERROR);
    }
}
