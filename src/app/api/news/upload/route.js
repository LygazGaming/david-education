// pages/api/upload.js

import cloudinary from "cloudinary";
import formidable from "formidable";
import fs from "fs";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình xử lý form
export const config = {
  api: {
    bodyParser: false, // Ngăn chặn body parser mặc định của Next.js để chúng ta có thể xử lý file
  },
};

// Hàm hỗ trợ xử lý file upload
const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { files } = await parseForm(req); // Lấy file từ request

      const file = files.file.filepath; // Đường dẫn file tạm thời
      const result = await cloudinary.v2.uploader.upload(file, {
        resource_type: "auto", // Hỗ trợ cả ảnh và video
      });

      res.status(200).json({ url: result.secure_url }); // Trả về URL của file sau khi upload
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
