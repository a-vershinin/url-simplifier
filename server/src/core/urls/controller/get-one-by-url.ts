// Core
import express from "express";
import HttpStatusCode from "http-status-codes";
import { z } from "zod";

// Definitions
import type { UrlShapeType } from "../types";

// Utils
import { UrlModel } from "../../../db/models/url";

const paramsSchema = z.object({
  shortUrl: z.string().min(1),
});

export const getOneByUrlHandler = (
  req: express.Request<
    { shortUrl: string },
    { data: UrlShapeType } | { error: { type: string; message: string } }
  >,
  res: express.Response<{ data: UrlShapeType } | { error: { type: string; message: string } }>,
) => {
  void (async () => {
    try {
      const { shortUrl } = req.params;

      // check if params invalid
      const errorParamsParsed = paramsSchema.safeParse(req.params);
      if (!errorParamsParsed.success) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ error: { type: "BadRequest", message: "Invalid params" } });
      }

      const rawUrl = await UrlModel.findOne({ shortUrl });

      // check if no shortUrl
      if (!rawUrl) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ error: { type: "NotFound", message: "URL not found" } });
      }

      const selectedUrl = {
        id: rawUrl._id.toString(),
        originalUrl: rawUrl.originalUrl,
        shortUrl: rawUrl.shortUrl,
      };

      return res.status(HttpStatusCode.OK).json({ data: selectedUrl });
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
