import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cors from "cors";
import { ENV } from "./Utils/env.js";
import { db } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import leadRouter from "./routes/lead.routes.js";

const app = express();

const PORT = ENV.PORT;

db();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/leads", leadRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
