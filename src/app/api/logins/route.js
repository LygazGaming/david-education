import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username, password } = await req.json();

  // Kiểm tra JWT_SECRET
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { message: "Server configuration error: JWT_SECRET is missing" },
      { status: 500 }
    );
  }

  // Lấy thông tin từ .env
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Kiểm tra xem thông tin đăng nhập có khớp không
  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ id: "user123" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Tên người dùng hoặc mật khẩu không đúng" },
      { status: 401 }
    );
  }
}
