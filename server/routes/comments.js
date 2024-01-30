import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js";
import { createComment } from "../controllers/comment.js";

const router = Router();

router.post('/:id', checkAuth, createComment);

export default router;