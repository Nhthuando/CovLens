import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./src/routes/authRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import {requestLogger} from "./src/middlewares/requestLogger.js"
import testRouter from "./src/routes/test.js"
import uploadRouter from "./src/routes/uploadRoutes.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLogger);


app.use("/auth", authRouter);
app.use("/test", testRouter);
app.use("/uploads", uploadRouter);

app.use(errorHandler);
app.get('/', (req, res) => {
    res.json({ status: "ok", message: "TestCovAI API" })
});

app.listen(PORT, ()=> {
    console.log("Server is running at : " + PORT);
})