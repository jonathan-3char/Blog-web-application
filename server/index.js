import express from "express";
import "dotenv/config";
import cors from "cors";
import { sessionConfig } from "./config/sessionDatabase.js";
import { router as sessionRouter } from "./routes/sessionRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as blogRouter } from "./routes/blogRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Recognize incoming request bodies as JSON objects
app.use(sessionConfig);

app.use("/session", sessionRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
