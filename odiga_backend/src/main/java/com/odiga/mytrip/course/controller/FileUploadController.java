package com.odiga.mytrip.course.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;
import java.io.IOException;
import java.util.UUID;

import org.json.JSONObject;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class FileUploadController {

   private final AmazonS3 amazonS3Client;

   @Value("${cloud.aws.s3.bucket}")
   private String bucket;

   @PostMapping
   public ResponseEntity<String> uploadFile(@RequestParam("upload") MultipartFile file) {
      try {

         String extension = ""; // 확장자를 저장할 변수 초기화
         if (file.getOriginalFilename().contains(".")) { // 파일명에 확장자가 있는 경우
             int dotIndex = file.getOriginalFilename().lastIndexOf('.');
             extension = file.getOriginalFilename().substring(dotIndex); // 마지막 '.' 이후의 문자열을 확장자로 추출
         }
         String fileName = UUID.randomUUID().toString() + extension; // UUID와 확장자를 조합해 새 파일명 생성
         String fileUrl = "https://projectodiga.s3.ap-northeast-2.amazonaws.com/" + fileName;

         ObjectMetadata metadata = new ObjectMetadata();
         metadata.setContentType(file.getContentType());
         metadata.setContentLength(file.getSize());


         amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);

         // 파일 URL을 JSON 형식으로 생성
         JSONObject jsonResponse = new JSONObject();
         jsonResponse.put("fileUrl", fileUrl);

         // JSON 형식으로 응답
         return ResponseEntity.ok(jsonResponse.toString());
      } catch (IOException e) {
         e.printStackTrace();
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }
}

