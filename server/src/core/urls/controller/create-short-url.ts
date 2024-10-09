// Core
import express from "express";
import HttpStatusCode from "http-status-codes";
import { urlAlphabet, customAlphabet } from "nanoid";
import { z } from "zod";

// Definitions
import type { UrlShapeType } from "../types";

// Utils
import { UrlModel } from "../../../db/models/url";

const createUrlSchema = z.object({
  originalUrl: z.string().min(1).url(),
});

export const createShortUrlHandler = (
  req: express.Request<void, { data: UrlShapeType }, { originalUrl: string }>,
  res: express.Response<
    | { data: UrlShapeType }
    | {
        error: {
          type: string;
          message: string;
          fields?: Record<string, string[]>;
        };
      }
  >,
) => {
  void (async () => {
    try {
      const { originalUrl } = req.body;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(void 0);
        }, 1500);
      });
      const bodyValues = req.body.originalUrl;
      const errorBodyParsed = createUrlSchema.safeParse({
        originalUrl,
      });

      if (!errorBodyParsed.success) {
        const fieldErrors = errorBodyParsed.error.flatten().fieldErrors;
        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
          error: {
            type: "Validation",
            message: "Some errors duaring validation body",
            fields: fieldErrors,
          },
        });
      }
      // check if originalUrl already exists in database
      const urlRawExist = await UrlModel.findOne({
        originalUrl,
      });

      if (urlRawExist) {
        const urlExist = {
          id: urlRawExist._id.toString(),
          originalUrl: urlRawExist.originalUrl,
          shortUrl: urlRawExist.shortUrl,
        };
        return res.status(HttpStatusCode.CREATED).json({ data: urlExist });
      }

      const shortCode = customAlphabet(urlAlphabet, 5)();

      // create new Url from originalUrl
      const rawNewUrl = new UrlModel({
        originalUrl: bodyValues,
        shortUrl: shortCode,
      });
      // save new Url to database
      await rawNewUrl.save();

      const newUrl = {
        id: rawNewUrl._id.toString(),
        originalUrl: rawNewUrl.originalUrl,
        shortUrl: rawNewUrl.shortUrl,
      };

      return res.status(HttpStatusCode.CREATED).json({ data: newUrl });
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
