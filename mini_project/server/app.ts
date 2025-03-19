import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "fs/promises";
import resolvers from "./resolvers/index";
import { ErrorHandler } from "./lib/ErrorHandler";
import { requireAuth } from "./lib/RequireAuth";
import { AuthenticatedRequest, getContext } from "./lib/Helpers";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_HOST || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(requireAuth);

// Apollo Middleware
let apolloServer: ApolloServer<{ req: Request; res: Response; auth: any }>;
(async () => {
  try {
    const typeDefs = await readFile("./schemas/schemas.graphql", "utf-8");
    apolloServer = new ApolloServer<{ req: Request; res: Response; auth: any }>(
      {
        typeDefs,
        resolvers,
      }
    );
    await apolloServer.start();
    console.log("Apollo Server started successfully!");
    app.use(
      "/graphql",
      cors({
        origin: process.env.CLIENT_HOST || "http://localhost:3000",
        credentials: true,
      }),
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({
          req,
          res,
          ...getContext(req as AuthenticatedRequest),
        }),
      })
    );
  } catch (error) {
    console.error("Error starting Apollo Server:s", error);
    throw Error("Error starting Apollo Server");
  }
})();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: true,
    message: `You got here, wohooo 🔥`,
  });
});

app.use(ErrorHandler);

export default app;
