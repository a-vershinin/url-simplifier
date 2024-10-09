// Core
import express from "express";

// Handlers
import { urlSimplifier } from "./controller";

const router = express.Router();

router.post("/", urlSimplifier.createShortUrl);
router.get("/", urlSimplifier.getAllUrls);
router.get("/:shortUrl", urlSimplifier.getOneUrl);
router.get("/:shortUrl/redirect", urlSimplifier.redirectByUrl);

export { router as urlsRouter };
