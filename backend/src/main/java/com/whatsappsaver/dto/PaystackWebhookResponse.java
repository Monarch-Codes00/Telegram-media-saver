package com.whatsappsaver.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaystackWebhookResponse {
    private String event;
    private DataPayload data;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DataPayload {
        private String reference;
        private Long amount;
        private String status;
        private Customer customer;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Customer {
        private String email;
    }
}
