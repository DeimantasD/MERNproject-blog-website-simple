import Blog from '../models/blogModel.js'
import mongoose from 'mongoose'
import User from '../models/userModel.js'

// GET - take all blogs
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createdAt: -1})
  res.status(200).json(blogs)
}



// GET - take one blog
export const getBlog = async (req, res) => {
  const { id } = req.params;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog.' });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'No such blog.' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST - create new blog
export const createBlog = async (req, res) => {
  const { title, summary, context } = req.body;
  const userId = req.user._id; // Get the user ID from the authenticated user
  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!summary) {
    emptyFields.push('summary');
  }
  if (!context) {
    emptyFields.push('context');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all the fields', emptyFields });
  }

  try {
    // Fetch the user details based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create the blog with user details
    const blog = await Blog.create({
      title,
      summary,
      context,
      user: {
        _id: user._id,
        email: user.email,
      },
    });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// PATCH - edit one blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }
  // Find and update the blog by ID with the request body data
  const blog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true });
  if (!blog) {
    return res.status(404).json({ error: 'No such blog.' });
  }
  res.status(200).json(blog);
};



// Delete - delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }
  // Find and delete the blog by ID
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return res.status(404).json({ error: 'No such blog.' });
  }
  res.status(200).json(blog);
};