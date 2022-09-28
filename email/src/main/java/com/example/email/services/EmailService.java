package com.example.email.services;

import com.example.email.models.Email;
import com.example.email.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    @Autowired
    private final EmailRepository emailRepository;

    public EmailService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public Email send(Email email) throws Exception {

        try {
            SimpleMailMessage emailMessage = new SimpleMailMessage();
            emailMessage.setFrom(sender);
            emailMessage.setTo(email.getTo());
            emailMessage.setSubject(email.getSubject());
            emailMessage.setText(email.getBody());

            javaMailSender.send(emailMessage);

            email.markAsSent(sender);
            return emailRepository.save(email);
        } catch (Exception e) {
            email.markAsError();
            emailRepository.save(email);
            throw new Exception("not was possible to send the email");
        }

    }
}
