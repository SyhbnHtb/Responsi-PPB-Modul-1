import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./src/routes/order.js";

dotenv.config();

const app = express();
app.use(express.json());

// Gunakan route order
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
