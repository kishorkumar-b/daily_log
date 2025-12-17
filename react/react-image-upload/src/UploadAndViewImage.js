import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { imageApi, videoApi } from "./api";

export default function UploadAndViewMedia() {
  const [activeTab, setActiveTab] = useState("images");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Load media
  const loadFiles = async () => {
    try {
      if (activeTab === "images") {
        const res = await imageApi.get("/all");
        setImages(res.data);
      } else {
        const res = await videoApi.get("/all");
        setVideos(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [activeTab]);

  // Upload
  const onDrop = async (acceptedFiles) => {
    setErrorMsg("");

    if (activeTab === "images") {
      const invalid = acceptedFiles.some((f) => !f.type.startsWith("image/"));
      if (invalid) return setErrorMsg("Only image files allowed!");
    }

    if (activeTab === "videos") {
      const invalid = acceptedFiles.some((f) => !f.type.startsWith("video/"));
      if (invalid) return setErrorMsg("Only video files allowed!");
    }

    const formData = new FormData();
    acceptedFiles.forEach((f) => formData.append("files", f));

    if (activeTab === "images") {
      await imageApi.post("/upload-multiple", formData);
    } else {
      await videoApi.post("/upload-multiple", formData);
    }

    loadFiles();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });
  
  // Delete
  const deleteImage = async (id) => {
    await imageApi.delete(`/${id}`);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const deleteVideo = async (id) => {
    await videoApi.delete(`/${id}`);
    setVideos((prev) => prev.filter((vid) => vid.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Media Manager</h2>

      {/* TABS */}
      <div style={styles.tabs}>
        {["images", "videos"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
            onClick={() => {
              setErrorMsg("");
              setActiveTab(tab);
            }}
          >
            {tab === "images" ? "Images" : "Videos"}
          </button>
        ))}
      </div>

      {/* ERROR */}
      {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}

      {/* DROPZONE */}
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag & drop {activeTab}, or click to upload</p>
      </div>

      {/* IMAGE GRID */}
      {activeTab === "images" && (
        <div style={styles.grid}>
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                exit={{ opacity: 0, scale: 0.6 }}
                style={styles.card}
              >
                <img
                  src={`http://localhost:8081/api/image/${img.id}`}
                  style={styles.img}
                  alt=""
                />

                {/* FILE NAME */}
                <div style={styles.fileName}>{img.file_name}</div>

                <button
                  onClick={() => deleteImage(img.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* VIDEO GRID */}
      {activeTab === "videos" && (
        <div style={styles.grid}>
          <AnimatePresence>
            {videos.map((vid) => (
              <motion.div
                key={vid.id}
                exit={{ opacity: 0, scale: 0.6 }}
                style={styles.card}
              >
                <video
                  controls
                  src={`http://localhost:8081/api/videos/${vid.id}`}
                  style={styles.video}
                />

                {/* FILE NAME */}
                <div style={styles.fileName}>{vid.file_name}</div>

                <button
                  onClick={() => deleteVideo(vid.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    fontFamily: "Arial",
    maxWidth: 900,
    margin: "0 auto",
  },
  heading: { textAlign: "center", marginBottom: 20 },
  tabs: { display: "flex", justifyContent: "center", marginBottom: 25 },
  tab: {
    padding: "10px 25px",
    margin: "0 10px",
    background: "#ddd",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  },
  activeTab: { background: "#2196f3", color: "#fff" },
  dropzone: {
    border: "3px dashed #888",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
    marginBottom: 30,
    cursor: "pointer",
  },
  errorBox: {
    background: "#ffe1e1",
    padding: 10,
    borderRadius: 6,
    textAlign: "center",
    color: "#d8000c",
    marginBottom: 15,
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 20,
  },
  card: { textAlign: "center" },
  img: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
  },
  video: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  fileName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    wordBreak: "break-word",
  },
  deleteBtn: {
    marginTop: 10,
    background: "red",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};