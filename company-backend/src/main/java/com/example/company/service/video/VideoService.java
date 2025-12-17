package com.example.company.service.video;

import com.example.company.repository.video.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    // Upload multiple
    public List<Integer> uploadMultiple(MultipartFile[] files) throws Exception {
        List<Integer> ids = new ArrayList<>();

        for (MultipartFile file : files) {
            int id = videoRepository.saveVideo(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            ids.add(id);
        }

        return ids;
    }

    public boolean deleteVideo(int id) {
        return videoRepository.deleteVideo(id) > 0;
    }

    public Map<String, Object> getVideo(int id) {
        return videoRepository.getVideo(id);
    }

    public List<Map<String, Object>> listVideos() {
        return videoRepository.listVideos();
    }
}

