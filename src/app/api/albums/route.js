// src/app/api/albums/route.js
import dbConnect from "../../utils/dbConnect";
import Album from "../..//models/Album";

export async function GET(req) {
  await dbConnect();

  try {
    const albums = await Album.find();
    return new Response(JSON.stringify(albums), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { title, artist } = await req.json();

  try {
    const newAlbum = new Album({ title, artist });
    await newAlbum.save();
    return new Response(JSON.stringify(newAlbum), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...

export async function PUT(req) {
  await dbConnect();

  const { id, title, artist } = await req.json();

  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { title, artist },
      { new: true }
    );
    if (!updatedAlbum) {
      return new Response(JSON.stringify({ message: "Album not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedAlbum), { status: 200 });
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
    const deletedAlbum = await Album.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return new Response(JSON.stringify({ message: "Album not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Album deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// ... existing code ...
