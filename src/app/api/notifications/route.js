import dbConnect from "../..//utils/dbConnect";
import Notification from "../../Notification";

export async function GET(req) {
  await dbConnect();

  try {
    const notifications = await Notification.find();
    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { message } = await req.json();

  try {
    const newNotification = new Notification({ message });
    await newNotification.save();
    return new Response(JSON.stringify(newNotification), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
