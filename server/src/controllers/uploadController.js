import { zipUploadSchema, githubUrlSchema } from "../validations/uploadValidate.js";
import {z} from "zod";
import prisma from "../config/prisma.js";
import supabase from "../config/supabase.js";
import {scanZip} from "../utils/zipScanner.js"

const allowedZipMimeTypes = new Set([
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
]);

const isZipFile = (file) => {
    if (!file?.originalname || !file?.mimetype) {
        return false;
    }

    return allowedZipMimeTypes.has(file.mimetype) || file.originalname.toLowerCase().endsWith(".zip");
};


export const uploadZip = async(req,res) => {
    try {
        if(!req.file) return res.status(400).json({message: "Không tìm thấy file upload!"});
        if (!isZipFile(req.file)) {
            return res.status(400).json({ message: "Chỉ chấp nhận file .zip hợp lệ" });
        }
        const result = zipUploadSchema.safeParse(req.body);
        if(!result.success) return res.status(400).json({error: z.flattenError(result.error)});
        const {projectId} = result.data;
        const resScanZip = await scanZip(req.file.buffer);
        if(resScanZip.ok === false) return res.status(422).json({ message: resScanZip.reason });
        const objectKey = `uploads/zips/${Date.now()}-${req.file.originalname}`;
        const { error: uploadError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(objectKey, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });
        if (uploadError) throw new Error(uploadError.message);
        const upload = await prisma.upload.create({data: {storagePath: objectKey, type: "zip", projectId}})
        return res.status(201).json({ id: upload.id, status: upload.status, createdAt: upload.createdAt });
    } catch (error) {
        if (error.code === "P2003") {
        return res.status(400).json({ message: "Project không tồn tại" });
    }
        console.log(error);
        return res.status(500).json({message: "Có lỗi server"})
    }
}

export const uploadGithubUrl = async(req,res) => {
    try {
        const result = githubUrlSchema.safeParse(req.body);
        if(!result.success) return res.status(400).json({error: z.flattenError(result.error)});
        const {projectId, repoUrl} = result.data;
        const upload = await prisma.upload.create({data: { type: "github_url", projectId, repoUrl}})
        return res.status(201).json({ id: upload.id, status: upload.status, createdAt: upload.createdAt });
    } catch (error) {
        if (error.code === "P2003") {
        return res.status(400).json({ message: "Project không tồn tại" });
    }
        console.log(error);
        return res.status(500).json({message: "Có lỗi server"})   
    }
}