import express from "express"
import { auth } from '../middleware/middleware.js';
import { getAwards } from "../Controllers/awards.js"
const router = express.Router();

router.get("/", auth, getAwards);

export default router;