package com.example.company.repository.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@Repository
public class ImageRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Save single image
    public int saveImage(String fileName, String fileType, byte[] data) {
        String sql = "INSERT INTO ImageFiles (file_name, file_type, file_data) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps =
                    connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, fileName);
            ps.setString(2, fileType);
            ps.setBytes(3, data);
            return ps;
        }, keyHolder);

        return keyHolder.getKey().intValue(); // return inserted ID
    }

    // Delete by ID
    public int deleteImage(int id) {
        String sql = "DELETE FROM ImageFiles WHERE id=?";
        return jdbcTemplate.update(sql, id);
    }

    // Get single image
    public Map<String, Object> getImageData(int id) {
        String sql = "SELECT file_type, file_data FROM ImageFiles WHERE id=?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, id);
        return result.isEmpty() ? null : result.get(0);
    }

    // List all
    public List<Map<String, Object>> getAllImages() {
        String sql = "SELECT id, file_name FROM ImageFiles ORDER BY id DESC";
        return jdbcTemplate.queryForList(sql);
    }
}
