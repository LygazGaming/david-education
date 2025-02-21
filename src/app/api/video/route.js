// src/app/api/videos/route.js
import dbConnect from "../../utils/dbConnect";
import Video from "../..//models/Video";

export async function GET(req) {
  await dbConnect();

  try {
    const videos = await Video.find();
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { title, videoUrl } = await req.json();

  try {
    const newVideo = new Video({ title, videoUrl });
    await newVideo.save();
    return new Response(JSON.stringify(newVideo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...

export async function PUT(req) {
  await dbConnect();

  const { id, title, videoUrl } = await req.json();

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, videoUrl },
      { new: true }
    );
    if (!updatedVideo) {
      return new Response(JSON.stringify({ message: "Video not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedVideo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...

export async function DELETE(req) {
  await dbConnect();

  const { id } = await req.json();

  try {
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return new Response(JSON.stringify({ message: "Video not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Video deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...
