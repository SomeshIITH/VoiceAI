import {getAuth} from 'firebase-admin/auth'
import {app} from './../config/firebase.js';
import User from '../models/user-model.js';
import crypto from 'crypto';
import {StatusCodes} from 'http-status-codes';

export const login = async(req,res)=>{
    try {
        const token = req.body;
        const decoded = getAuth(app).verifyIdToken(token);
        let user = await User.findOne({firebaseUid:decoded.uid});
        if(!user){
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email
            })
        }
        const sessionId = crypto.randomUUID();
        res.cookie('session',sessionId,{
            httpOnly: true,
            secure : false,
            sameSite : "strict",
            maxAge : 7*24*60*60*1000
        })

        return res.json(StatusCodes.OK).json(user);
    } catch (error) {
        return res.json(StatusCodes.INTERNAL_SERVER_ERROR).json({message : `login error : ${error}`});
    }
}

export const logout = async(req,res)=>{
    try {
        const sessionId = req.cookies?.session;
        res.clearCookie('session');
        return res.json(StatusCodes.OK).json({message : "logout success"});
    } catch (error) {
        return res.json(StatusCodes.INTERNAL_SERVER_ERROR).json({message : `logout error : ${error}`});
    }
}