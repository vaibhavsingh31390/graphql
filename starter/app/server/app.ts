import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const publicPath = path.join(__dirname, "public");

if (process.env.APP_ENV === "dev") {
  console.log("🔄 LiveReload enabled (Development Mode)");

  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");

  const liveReloadServer = livereload.createServer({
    exts: ["js", "html", "css"],
    delay: 100,
  });

  liveReloadServer.watch(publicPath);
  app.use(connectLivereload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(publicPath));

// Handle Client-Side Routing with Build Check
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  const indexPath = path.join(publicPath, "index.html");

  if (!fs.existsSync(indexPath)) {
    console.log("⚠️ Waiting for build...");
    setTimeout(() => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(503).send("Build in progress, please refresh soon...");
      }
    }, 1000);
  } else {
    res.sendFile(indexPath);
  }
});

export default app;
