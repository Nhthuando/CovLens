import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/protected", verifyToken, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Truy cập thành công!",
        user: req.user,
    });
});

export default router;