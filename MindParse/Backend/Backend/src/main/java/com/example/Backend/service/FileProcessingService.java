package com.example.Backend.service;

import java.nio.charset.StandardCharsets;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileProcessingService {

    public String extractText(MultipartFile file) throws Exception {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Filename is missing");
        }

        String extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        String content = "";

        switch (extension) {
            case "pdf":
                try (PDDocument document = PDDocument.load(file.getInputStream())) {
                    PDFTextStripper stripper = new PDFTextStripper();
                    content = stripper.getText(document);
                }
                break;
            case "txt":
                content = new String(file.getBytes(), StandardCharsets.UTF_8);
                break;
            case "docx":
                try (XWPFDocument doc = new XWPFDocument(file.getInputStream())) {
                    try (XWPFWordExtractor extractor = new XWPFWordExtractor(doc)) {
                        content = extractor.getText();
                    }
                }
                break;
            default:
                throw new IllegalArgumentException("Unsupported file type: " + extension);
        }

        return content.trim();
    }
}
