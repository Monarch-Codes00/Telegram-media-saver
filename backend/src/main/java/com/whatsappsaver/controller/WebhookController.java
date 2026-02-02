package com.whatsappsaver.controller;

import com.whatsappsaver.dto.PaystackWebhookResponse;
import com.whatsappsaver.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook")
@RequiredArgsConstructor
public class WebhookController {
    private final PaymentService paymentService;

    @PostMapping("/paystack")
    public ResponseEntity<Void> handlePaystackWebhook(@RequestBody PaystackWebhookResponse response) {
        paymentService.processWebhook(response);
        return ResponseEntity.ok().build();
    }
}
