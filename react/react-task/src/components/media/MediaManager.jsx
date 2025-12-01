import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { imageApi, videoApi } from "../../api/axiosConfig";
import PopupMessage from "../common/PopupMessage";

export default function MediaManager() {
  const [activeTab, setActiveTab] = useState("images");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");

  // popup
  const [popupShow, setPopupShow] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // delete info
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  // ---------------- LOAD FILES ----------------
  const loadFiles = useCallback(async () => {
    try {
      if (activeTab === "images") {
        const res = await imageApi.get("/all");
        setImages(res.data || []);
      } else {
        const res = await videoApi.get("/all");
        setVideos(res.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  }, [activeTab]);

  useEffect(() => {
    loadFiles();
    setSearchText("");
    setErrorMsg("");
  }, [activeTab, loadFiles]);

  // ---------------- UPLOAD ----------------
  const onDrop = async (acceptedFiles) => {
    setErrorMsg("");

    const isImageTab = activeTab === "images";
    const valid = acceptedFiles.every((f) =>
      isImageTab ? f.type.startsWith("image/") : f.type.startsWith("video/")
    );

    if (!valid) {
      return setErrorMsg(`Only ${isImageTab ? "image" : "video"} files allowed`);
    }

    const formData = new FormData();
    acceptedFiles.forEach((f) => formData.append("files", f));

    if (isImageTab) {
      await imageApi.post("/upload-multiple", formData);
    } else {
      await videoApi.post("/upload-multiple", formData);
    }

    setPopupMessage("Upload successful!");
    setPopupShow(true);

    loadFiles();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  // ---------------- ASK DELETE ----------------
  const askDelete = (id, type) => {
    setDeleteId(id);
    setDeleteType(type);
    setPopupMessage(`Are you sure you want to delete this ${type}?`);
    setPopupShow(true);
  };

  // ---------------- CONFIRM DELETE ----------------
  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    if (deleteType === "image") {
      await imageApi.delete(`/${deleteId}`);
      setImages((prev) => prev.filter((i) => i.id !== deleteId));
    }

    if (deleteType === "video") {
      await videoApi.delete(`/${deleteId}`);
      setVideos((prev) => prev.filter((v) => v.id !== deleteId));
    }

    setPopupMessage("Deleted successfully!");
    setDeleteId(null);
    setDeleteType("");

    setPopupShow(true);
  };

  // ---------------- FILTER ----------------
  const filteredImages = images.filter((i) =>
    i.file_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredVideos = videos.filter((v) =>
    v.file_name.toLowerCase().includes(searchText.toLowerCase())
  );

  // correct dynamic url
  const fileUrl = (id) =>
    `http://localhost:8081/api/${
      activeTab === "images" ? "images" : "videos"
    }/${id}`;

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* POPUP */}
      <PopupMessage
        show={popupShow}
        message={popupMessage}
        onClose={() => {
          if (popupMessage.startsWith("Are you")) {
            handleConfirmDelete(); // run delete
          } else {
            setPopupShow(false); // close popup
          }
        }}
      />

      {/* HEADER */}
      <h2 className="text-center text-3xl font-bold mb-6">Media Manager</h2>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-6">
        {["images", "videos"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {tab === "images" ? "Images" : "Videos"}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <input
        type="text"
        value={searchText}
        placeholder={`Search ${activeTab}...`}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      />

      {/* ERROR BOX */}
      {errorMsg && (
        <div className="bg-red-100 p-3 text-red-700 rounded-lg mb-4">
          {errorMsg}
        </div>
      )}

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className="border-4 border-dashed border-gray-500 py-10 rounded-xl 
        text-center cursor-pointer hover:bg-gray-100 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 font-medium">
          Drag & drop {activeTab}, or click to upload
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6">
        <AnimatePresence>
          {(activeTab === "images" ? filteredImages : filteredVideos).map(
            (file) => (
              <motion.div
                key={file.id}
                exit={{ opacity: 0, scale: 0.7 }}
                className="bg-white p-3 shadow-md rounded-lg flex flex-col items-center"
              >
                {activeTab === "images" ? (
                  <img
                    src={fileUrl(file.id)}
                    className="w-full h-40 rounded-lg object-cover"
                    alt=""
                  />
                ) : (
                  <video
                    controls
                    src={fileUrl(file.id)}
                    className="w-full h-40 rounded-lg"
                  />
                )}

                <div className="mt-2 font-semibold text-sm text-center">
                  {file.file_name}
                </div>

                <button
                  onClick={() => askDelete(file.id, activeTab)}
                  className="mt-3 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
