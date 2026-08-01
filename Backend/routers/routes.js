import express from 'express';

const router = express.Router();


router.get('/',(req,res)=>{
    return res.json("hello from backend");
})


export default router;