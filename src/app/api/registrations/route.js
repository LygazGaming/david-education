import dbConnect from "../../utils/dbConnect";
import Registration from "../../models/Registration";

const jsonResponse = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(req) {
  await dbConnect();

  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return jsonResponse({ success: true, data: registrations }, 200);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const {
      type,
      studentName,
      birthDate,
      parentName,
      phone,
      email,
      trialSession,
      courseId,
      courseTitle,
    } = body;

    if (!type || !studentName || !phone) {
      return jsonResponse(
        { success: false, message: "Thiếu các trường bắt buộc" },
        400
      );
    }
    if (type === "trial" && !trialSession) {
      return jsonResponse(
        { success: false, message: "Thiếu ca học thử cho đăng ký tập thử" },
        400
      );
    }
    if (type === "course" && !courseId && !courseTitle) {
      return jsonResponse(
        { success: false, message: "Thiếu thông tin học phần" },
        400
      );
    }

    const newRegistration = new Registration({
      type,
      studentName,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      parentName,
      phone,
      email,
      trialSession: type === "trial" ? trialSession : undefined,
      courseId: type === "course" ? courseId : undefined,
      courseTitle: type === "course" ? courseTitle : undefined,
    });
    await newRegistration.save();

    return jsonResponse({ success: true, data: newRegistration }, 201);
  } catch (error) {
    console.error("Error saving registration:", error);
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}
