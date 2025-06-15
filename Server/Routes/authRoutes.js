import { Router } from 'express';
import  {register, login, isAuth, updateProgress, shareVerse}  from '../Controllers/authController.js';
import { auth } from '../middleware/middleware.js';




const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, isAuth);
router.post("/update-progress", auth, updateProgress);
router.post("/share/:receiver", auth, shareVerse)


export default router;
