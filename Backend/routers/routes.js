import express from 'express';
import { login, logout } from '../controllers/auth-controller.js';

const router = express.Router();


router.get('/',(req,res)=>{
    return res.json("hello from backend");
})

router.post('/login',login);
router.get('/logout',logout);


export default router;