import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    try {
        const tokenHeader = req.header("authorization");
        if(!tokenHeader) return res.status(401).json({message: "Không tìm thấy token!"});
        const token = tokenHeader.split(" ")[1];
        if(!token) return res.status(401).json({message: "Không tìm thấy token!"});
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = { id: payload.id, email: payload.email };
        next()
    } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
        }
    console.log(error);
    return res.status(500).json({ message: "Có lỗi server!" });
    }
}