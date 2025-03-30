const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const blog = await Blog.create({ title, content, category, author: req.user.id });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Error creating blog" });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(400).json({ message: "Error fetching blogs" });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: "Error updating blog" });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndDelete(id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting blog" });
    }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
