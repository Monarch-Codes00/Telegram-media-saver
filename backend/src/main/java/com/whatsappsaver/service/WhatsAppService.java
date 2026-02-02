package com.whatsappsaver.service;

import com.whatsappsaver.model.User;
import com.whatsappsaver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WhatsAppService {
    private final UserRepository userRepository;

    public boolean canSaveMessage(String email) {
        return userRepository.findByEmail(email)
                .map(User::isSubscriptionActive)
                .orElse(false);
    }

    public void saveViewOnceMedia(String email, String mediaUrl) {
        if (canSaveMessage(email)) {
            log.info("Saving view-once media for user {}: {}", email, mediaUrl);
            // Logic to download and store media would go here
        } else {
            log.warn("User {} is not subscribed. Cannot save media.", email);
        }
    }
}
