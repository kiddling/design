import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import assignmentsRouter from "./routes/assignments.js";
import { resolveStoragePath } from "./utils/storage.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentsRouter);

app.get("/api/files/:assignmentId/:filename", (req, res) => {
  const { assignmentId, filename } = req.params;
  const filePath = resolveStoragePath("uploads", assignmentId, filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  
  res.sendFile(filePath);
});

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  const distPath = path.resolve(import.meta.dirname, "public");
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
