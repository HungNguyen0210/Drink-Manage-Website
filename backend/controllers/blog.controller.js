import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    const blogsWithFullImagePath = blogs.map((blog) => ({
      ...blog.toObject(),
      image: `http://localhost:5000/assets/${blog.image}`,
    }));

    res.status(200).json({
      success: true,
      data: blogsWithFullImagePath,
    });
  } catch (error) {
    console.error("Error in fetching blogs:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, displayHot } = req.body;

    // Kiểm tra title và content
    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }

    // Kiểm tra nếu không có ảnh
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imagePath = req.file.filename;

    const newBlog = new Blog({
      image: imagePath,
      title,
      content,
      displayHot,
    });

    await newBlog.save();
    const blogWithImage = {
      ...newBlog.toObject(),
      image: `http://localhost:5000/assets/${newBlog.image}`,
    };

    res.status(201).json({
      success: true,
      data: blogWithImage,
    });
  } catch (error) {
    console.error("Error in creating blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, displayHot } = req.body;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Blog ID" });
  }

  try {
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    let updatedImagePath = existingBlog.image;
    if (req.file) {
      updatedImagePath = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, image: updatedImagePath, displayHot },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        ...updatedBlog.toObject(),
        image: updatedBlog.image
          ? `http://localhost:5000/assets/${updatedBlog.image}`
          : null,
      },
    });
  } catch (error) {
    console.error("Error in updating blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Blog ID" });
  }

  try {
    // Tìm và xóa blog theo ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    // Nếu blog không tồn tại
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Trả về thông báo thành công sau khi xóa
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
