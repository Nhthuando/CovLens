import { Router } from "express";
import { uploadGithubUrl, uploadZip } from "../controllers/uploadController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post("/zip", verifyToken, upload.single("file"), uploadZip);
router.post("/github-url", verifyToken, uploadGithubUrl);

export default router;