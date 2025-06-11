package com.example.Backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "djbfwtxx7");
        config.put("api_key", "198462412711768");
        config.put("api_secret", "Pclo_zMBzeWfElPx3PTXDWJ2MYs");
        return new Cloudinary(config);
    }
}
