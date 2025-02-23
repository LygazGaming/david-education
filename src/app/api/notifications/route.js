import dbConnect from "../..//utils/dbConnect";
import Notification from "../../models/Notification";

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

export async function PUT(req) {
  await dbConnect();

  const { id, message } = await req.json();

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    if (!updatedNotification) {
      return new Response(
        JSON.stringify({ message: "Notification not found" }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(updatedNotification), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
