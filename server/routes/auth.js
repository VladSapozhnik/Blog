import { Router } from "express";
import { login, register, getUser } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', checkAuth, getUser);

export default router;