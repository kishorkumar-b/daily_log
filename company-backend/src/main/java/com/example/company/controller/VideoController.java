package com.example.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Upload single video
    // Upload multiple videos
    @PostMapping("/upload-multiple")
    public ResponseEntity<List<Integer>> uploadMultiple(@RequestParam("files") MultipartFile[] files) throws Exception {
        List<Integer> ids = new ArrayList<>();
        String sql = "INSERT INTO VideoFiles (file_name, file_type, file_data) VALUES (?, ?, ?)";

        for (MultipartFile file : files) {
            jdbcTemplate.update(sql, file.getOriginalFilename(), file.getContentType(), file.getBytes());
            Integer id = jdbcTemplate.queryForObject("SELECT CAST(SCOPE_IDENTITY() AS INT)", Integer.class);
            ids.add(id);
        }

        return ResponseEntity.ok(ids);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable int id) {
        String sql = "DELETE FROM VideoFiles WHERE id=?";
        int rows = jdbcTemplate.update(sql, id);

        if (rows > 0)
            return ResponseEntity.ok("Video deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
    }


    // Download video by ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getVideo(@PathVariable int id) {
        String sql = "SELECT file_type, file_data FROM VideoFiles WHERE id=?";
        return jdbcTemplate.query(sql, new Object[]{id}, rs -> {
            if (rs.next()) {
                String type = rs.getString("file_type");
                byte[] data = rs.getBytes("file_data");
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(type))
                        .contentLength(data.length)
                        .body(data);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        });
    }

    // List all videos
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> listVideos() {
        String sql = "SELECT id, file_name FROM VideoFiles ORDER BY id DESC";
        return ResponseEntity.ok(jdbcTemplate.queryForList(sql));
    }
}
