const express = require('express');
const router = express.Router();
const { Posts, Op } = require('../models');

const createNewPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Posts.create({
            title,
            content
        });
        return res.status(201).json({ message: "게시글을 생성하였습니다." });
    } catch (err) {
        return res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({ order: [['createdAt', 'DESC']] });
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
};

const updatePost = async (req, res) => {
    const { title, content, password } = req.body;

    try {
        const post = await Posts.findOne({
            where: { 
                id: req.params.postId,
                password: password 
            }
        });
        if (!post) { 
            return res.status(404).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
        }

        post.title = title;
        post.content = content;

        await post.save();
        res.status(201).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
};

const deletePostById = async (req, res) => {
    const { password } = req.body;

    try {
        const post = await Posts.findOne({
            where: { 
                id: req.params.postId,
                password: password 
            }
        });
        if (!post) {
            return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }

        await post.destroy();
        res.status(201).json({ message: '게시글을 삭제하였습니다.' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
};

router.post('/', createNewPost);
router.get('/', getAllPosts);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePostById);

module.exports = router;
