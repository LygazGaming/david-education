import dbConnect from "../../utils/dbConnect";
import PhotoAlbum from "../../models/PhotoAlbum";

export async function GET(req) {
  await dbConnect();
  const albums = await PhotoAlbum.find().limit(6).lean(); // Sử dụng model PhotoAlbum
  return new Response(JSON.stringify({ success: true, data: albums }), {
    status: 200,
  });
}
