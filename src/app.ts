import express from "express";
import pdfRoutes from "./routes/routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// PDF Download Routes
app.use("/api", pdfRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
