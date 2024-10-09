// Core
import express from "express";

// Routes
import { urlsRouter } from "./core/urls/router";

const appRouter = express.Router();

// Handle REST API helth-check routes
appRouter.get("/helth-check", (_, res: express.Response) => {
  res.status(200).json({ data: "success" });
});
appRouter.head("/helth-check", (_, res: express.Response) => {
  res.status(200).end();
});

// Custome routes
appRouter.use("/urls", urlsRouter);

export { appRouter };
