import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

//API

// CLIENT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
