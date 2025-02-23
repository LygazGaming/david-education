// /src/models/PhotoAlbum.js
import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String },
});

const PhotoAlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Ảnh đại diện
  description: { type: String, required: true },
  photos: [PhotoSchema], // Danh sách ảnh trong album
});

export default mongoose.models.PhotoAlbum ||
  mongoose.model("PhotoAlbum", PhotoAlbumSchema);
