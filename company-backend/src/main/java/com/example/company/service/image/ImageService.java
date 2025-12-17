package com.example.company.service.image;

import com.example.company.repository.image.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    // Upload multiple images
    public List<Integer> uploadMultipleImages(MultipartFile[] files) throws Exception {
        List<Integer> ids = new ArrayList<>();

        for (MultipartFile file : files) {
            int id = imageRepository.saveImage(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            ids.add(id);
        }
        return ids;
    }

    // Delete
    public boolean deleteImage(int id) {
        return imageRepository.deleteImage(id) > 0;
    }

    // Get image data
    public Map<String, Object> getImageById(int id) {
        return imageRepository.getImageData(id);
    }

    // List
    public List<Map<String, Object>> listAllImages() {
        return imageRepository.getAllImages();
    }
}
