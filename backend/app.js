import express from "express";
import cors from "cors";
import apirouter from "./routes/index.js"
const app= express();


app.use(cors({
    origin: process.env.CLIENT_URL,
  }));
app.use(express.json());

app.use("/api", apirouter);


app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


export default app;