import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authBodyValidate } from "../validations/authValidate.js";
import {z} from "zod";

export const register = async (req,res) => {
    try {
        const result = authBodyValidate.safeParse(req.body);
        if(!result.success) return res.status(400).json({error: z.flattenError(result.error)});
        const {email,password} = result.data;
        const existEmail = await prisma.user.findUnique({where: {email: email}});
        if(existEmail) return res.status(401).json({message: "Tài khoản đã tồn tại!"});
        const passwordHash = await bcrypt.hash(password,10);
        const user = await prisma.user.create({data: {email: email, passwordHash: passwordHash}, select: {id: true,email: true, createdAt: true}});
        return res.status(201).json({user: user.id, email: user.email, createdAt: user.createdAt});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Có lỗi server!"})
    }
}

export const login = async (req,res) => {
    try {
        const result = authBodyValidate.safeParse(req.body);
        if(!result.success) return res.status(400).json({error: z.flattenError(result.error)});
        const {email,password} = result.data;
        const user = await prisma.user.findUnique({where: {email: email}});
        if(!user) return res.status(401).json({message: "Email hoặc mật khẩu không đúng!"});
        const hashedPass = await bcrypt.compare(password,user.passwordHash);
        if(!hashedPass) return res.status(401).json({message:"Email hoặc mật khẩu không đúng!"});
        const token = jwt.sign({ id: user.id, email: user.email },process.env.JWT_SECRET,{ expiresIn: "2h" });
        return res.status(200).json({message: "Đăng nhập thành công!", token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Có lỗi server!"});
    }
}
