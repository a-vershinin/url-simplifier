// Core
require("dotenv").config();
import express from "express";
import cors from "cors";

// Utils
import { initDatabase } from "./db/connection";
import { appRouter } from "./router";
import { appConfig } from "./configs";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    console.log("Start running server ...");

    // Setup DB
    await initDatabase();

    // Setup ExpressApp
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: "*",
      }),
    );

    // Handle REST API routes
    app.use(appConfig.api.prefixBase, appRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server app error:", err);
    process.exit(1);
  }
}

main();
