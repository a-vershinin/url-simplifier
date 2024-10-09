// Core
import express from "express";
import HttpStatusCode from "http-status-codes";

// Definitions
import type { UrlShapeType } from "../types";

// Utils
import { UrlModel } from "../../../db/models/url";

export const getAllUrlsHandler = (
  _: express.Request,
  res: express.Response<{ data: UrlShapeType[] } | { error: { type: string; message: string } }>,
) => {
  void (async () => {
    try {
      const rawUrls = await UrlModel.find();
      const urls =
        rawUrls.length > 0
          ? rawUrls.map((url) => {
              return {
                id: url._id.toString(),
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl,
              };
            })
          : [];

      return res.status(HttpStatusCode.OK).json({ data: urls });
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: { type: "Internal", message: err.message } });
      }
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { type: "Unexpected", message: "Unexpected server error" } });
    }
  })();
};
