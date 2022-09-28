package com.example.email.controllers;

import com.example.email.controllers.request.EmailRequest;
import com.example.email.controllers.response.EmailResponse;
import com.example.email.models.Email;
import com.example.email.repositories.EmailRepository;
import com.example.email.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailRepository emailRepository;

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public ResponseEntity<EmailResponse> send(@RequestBody EmailRequest body) {
        Email email = new Email(
                body.getTo(),
                body.getSubject(),
                body.getBody()
        );

        try {
            Email emailSent = emailService.send(email);
            return new ResponseEntity<>(EmailResponse.from(emailSent), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/emails", method = RequestMethod.GET)
    public List<EmailResponse> all() {
        return emailRepository.findAll().stream().map(EmailResponse::from).toList();
    }

}
