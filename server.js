import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import cors from "cors";
import fs from "fs";

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Create the public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, "public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Set up storage with unique filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir); // Save files in the public/images directory
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);
    const originalName = path.basename(file.originalname, extension);
    cb(null, originalName + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).send({ filePath: `images/${req.file.filename}` });
  } catch (error) {
    res.status(500).send("Error uploading file");
  }
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, "dist")));

  // Handle client-side routing, return index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  // In development, assume Vite is running on a different port
  app.get("*", (req, res) => {
    res.redirect(`http://localhost:5173${req.originalUrl}`);
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
