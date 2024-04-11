package com.odiga.mytrip.service;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Document.Type;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NaturalLanguageService {

    @Value("${google.cloud.language.api-key-file-path}")
    private String apiKeyFilePath;

    public void analyzeEntities(String text) throws IOException {
        // 인증 정보를 설정합니다.
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", apiKeyFilePath);

        // 클라이언트 인스턴스를 생성합니다.
        try (LanguageServiceClient language = LanguageServiceClient.create()) {
            Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
            // 엔티티 분석을 요청합니다.
            language.analyzeEntities(doc).getEntitiesList().forEach(entity -> {
                System.out.printf("Entity: %s\n", entity.getName());
                System.out.printf("Salience: %.3f\n", entity.getSalience());
                // 여기에 추가적인 처리를 할 수 있습니다.
            });
        }
    }
}

