package com.example.company.controller;

import com.example.company.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // Upload multiple images
    @PostMapping("/upload-multiple")
    public ResponseEntity<List<Integer>> uploadMultiple(@RequestParam("files") MultipartFile[] files) throws Exception {
        return ResponseEntity.ok(imageService.uploadMultipleImages(files));
    }

    // Delete image
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable int id) {
        boolean deleted = imageService.deleteImage(id);

        if (deleted)
            return ResponseEntity.ok("Image deleted successfully");

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
    }

    // Get image by ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        Map<String, Object> image = imageService.getImageById(id);

        if (image == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        String type = (String) image.get("file_type");
        byte[] data = (byte[]) image.get("file_data");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(type))
                .contentLength(data.length)
                .body(data);
    }

    // List images
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> listImages() {
        return ResponseEntity.ok(imageService.listAllImages());
    }
}
