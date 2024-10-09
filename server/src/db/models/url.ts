// Core
import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

export const UrlModel = mongoose.model("Url", UrlSchema);
