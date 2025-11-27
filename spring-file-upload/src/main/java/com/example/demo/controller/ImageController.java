package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Upload single image
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        String sql = "INSERT INTO ImageFiles (file_name, file_type, file_data) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        Integer id = jdbcTemplate.queryForObject("SELECT CAST(SCOPE_IDENTITY() AS INT)", Integer.class);
        return ResponseEntity.ok(id);
    }

    // Upload multiple images
    @PostMapping("/upload-multiple")
    public ResponseEntity<List<Integer>> uploadMultiple(@RequestParam("files") MultipartFile[] files) throws Exception {
        List<Integer> ids = new ArrayList<>();
        String sql = "INSERT INTO ImageFiles (file_name, file_type, file_data) VALUES (?, ?, ?)";

        for (MultipartFile file : files) {
            jdbcTemplate.update(sql, file.getOriginalFilename(), file.getContentType(), file.getBytes());
            Integer id = jdbcTemplate.queryForObject("SELECT CAST(SCOPE_IDENTITY() AS INT)", Integer.class);
            ids.add(id);
        }

        return ResponseEntity.ok(ids);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable int id) {
        String sql = "DELETE FROM ImageFiles WHERE id=?";
        int rows = jdbcTemplate.update(sql, id);

        if (rows > 0)
            return ResponseEntity.ok("Image deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
    }


    // Get single image by ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        String sql = "SELECT file_type, file_data FROM ImageFiles WHERE id=?";
        return jdbcTemplate.query(sql, new Object[]{id}, rs -> {
            if (rs.next()) {
                String type = rs.getString("file_type");
                byte[] data = rs.getBytes("file_data");
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(type))
                        .body(data);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        });
    }

    // List all images
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> listImages() {
        String sql = "SELECT id, file_name FROM ImageFiles ORDER BY id DESC";
        return ResponseEntity.ok(jdbcTemplate.queryForList(sql));
    }
}
