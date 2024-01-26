import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getById, getMyPosts, removePost, updatePost } from "../controllers/posts.js";

const router = Router();

//create post
router.post('/', checkAuth, createPost);

//all post
router.get('/', getAll);

//get post by post
router.get('/:id', getById);

//get my posts
router.get('/user/me', checkAuth, getMyPosts);

//get my posts
router.put('/:id', checkAuth, updatePost);

//remove posts
router.delete('/:id', checkAuth, removePost);

export default router;