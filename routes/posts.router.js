const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

const createNewPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Posts.create({
            title,
            content
        });
        return res.status(201).json(post);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    try {
        const post = await Posts.findOne({
            where: { id: postId },
        });
        if (post) {
            await post.update({
                title,
                content
            });
            return res.status(200).json(post);
        }
        return res.status(404).json({ message: "Post not found" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deletePostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Posts.findOne({
            where: { id: postId },
        });
        if (post) {
            await post.destroy();
            return res.status(204).json();
        }
        return res.status(404).json({ message: "Post not found" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

router.post('/', createNewPost);
router.get('/', getAllPosts);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePostById);

module.exports = router;
