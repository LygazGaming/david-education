// src/app/api/courses/route.js
import dbConnect from "../../utils/dbConnect";
import Course from "../..//models/Course";

export async function GET(req) {
  await dbConnect();

  try {
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  const { title, price, features, isPopular } = await req.json();

  try {
    const newCourse = new Course({ title, price, features, isPopular });
    await newCourse.save();
    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  await dbConnect();

  const { id, title, price, features, isPopular } = await req.json();

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, price, features, isPopular },
      { new: true }
    );
    if (!updatedCourse) {
      return new Response(JSON.stringify({ message: "Course not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedCourse), { status: 200 });
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
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return new Response(JSON.stringify({ message: "Course not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Course deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
