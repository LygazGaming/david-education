// api/news/upload.js - API upload ảnh lên FTP
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import Client from "ftp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "/tmp";
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Upload error" });
    }

    const file = files.file[0];
    const fileName = file.newFilename;
    const filePath = file.filepath;
    const ftpPath = `/public_html/uploads/${fileName}`;

    const ftpClient = new Client();
    const ftpConfig = {
      host: "ftp.davideducation.com",
      user: "jwdihrep",
      password: "Davideducation1000hocvien", // Thay bằng mật khẩu thật
    };

    ftpClient.on("ready", () => {
      ftpClient.put(filePath, ftpPath, (err) => {
        fs.unlinkSync(filePath);
        ftpClient.end();
        if (err) {
          return res.status(500).json({ message: "FTP upload failed" });
        }
        return res
          .status(200)
          .json({ url: `https://davideducation.com/uploads/${fileName}` });
      });
    });

    ftpClient.connect(ftpConfig);
  });
}
