import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Set security HTTP headers
app.use(morgan("dev")); // Log the requests

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
