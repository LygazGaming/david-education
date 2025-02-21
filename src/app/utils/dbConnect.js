import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối tới MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConnect;
