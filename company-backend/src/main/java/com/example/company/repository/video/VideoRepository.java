package com.example.company.repository.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@Repository
public class VideoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Save one video & return ID
    public int saveVideo(String name, String type, byte[] data) {
        String sql = "INSERT INTO VideoFiles (file_name, file_type, file_data) VALUES (?, ?, ?)";

        KeyHolder holder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            ps.setString(2, type);
            ps.setBytes(3, data);
            return ps;
        }, holder);

        return holder.getKey().intValue();
    }

    // Delete
    public int deleteVideo(int id) {
        return jdbcTemplate.update("DELETE FROM VideoFiles WHERE id=?", id);
    }

    // Get video by ID
    public Map<String, Object> getVideo(int id) {
        List<Map<String, Object>> result =
                jdbcTemplate.queryForList("SELECT file_type, file_data FROM VideoFiles WHERE id=?", id);

        return result.isEmpty() ? null : result.get(0);
    }

    // List all
    public List<Map<String, Object>> listVideos() {
        return jdbcTemplate.queryForList("SELECT id, file_name FROM VideoFiles ORDER BY id DESC");
    }
}
