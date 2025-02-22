import dbConnect from "../../utils/dbConnect";
import News from "../../models/News";

export async function GET(req) {
  await dbConnect();

  try {
    const news = await News.find();
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { title, content } = await req.json();

  try {
    const newNews = new News({ title, content });
    await newNews.save();
    return new Response(JSON.stringify(newNews), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  await dbConnect();

  const { id } = await req.json();

  try {
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return new Response(JSON.stringify({ message: "News not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ message: "News deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
