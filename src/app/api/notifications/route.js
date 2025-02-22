import dbConnect from "../..//utils/dbConnect";
import Notification from "../../models/Notification";

export async function GET(req) {
  await dbConnect();

  const { id } = req.query;

  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return new Response(
        JSON.stringify({ message: "Notification not found" }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(notification), { status: 200 });
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
