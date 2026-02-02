package com.telegramsaver.service;

import com.telegramsaver.dto.PaystackWebhookResponse;
import com.telegramsaver.model.Payment;
import com.telegramsaver.model.User;
import com.telegramsaver.repository.PaymentRepository;
import com.telegramsaver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Transactional
    public void processWebhook(PaystackWebhookResponse response) {
        if ("charge.success".equals(response.getEvent())) {
            PaystackWebhookResponse.DataPayload data = response.getData();
            
            // Save payment record
            Payment payment = Payment.builder()
                    .reference(data.getReference())
                    .email(data.getCustomer().getEmail())
                    .amount(data.getAmount() / 100.0) // Paystack amount is in kobo
                    .status(data.getStatus())
                    .build();
            paymentRepository.save(payment);

            // Update user subscription
            updateUserSubscription(data.getCustomer().getEmail());
        }
    }

    private void updateUserSubscription(String email) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> User.builder()
                        .email(email)
                        .subscriptionActive(true)
                        .build());

        user.setSubscriptionActive(true);
        // Add 30 days to current expiry or from now
        LocalDateTime startFrom = (user.getSubscriptionExpiry() != null && user.getSubscriptionExpiry().isAfter(LocalDateTime.now()))
                ? user.getSubscriptionExpiry()
                : LocalDateTime.now();
        
        user.setSubscriptionExpiry(startFrom.plusDays(30));
        userRepository.save(user);
    }
}
