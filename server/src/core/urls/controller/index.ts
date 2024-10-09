// Utils
import { createShortUrlHandler } from "./create-short-url";
import { getAllUrlsHandler } from "./get-all-urls";
import { redirectByUrlHandler } from "./redirect-by-url";
import { getOneByUrlHandler } from "./get-one-by-url";

class UrlSimplifierCtrl {
  createShortUrl = createShortUrlHandler;
  getAllUrls = getAllUrlsHandler;
  getOneUrl = getOneByUrlHandler;
  redirectByUrl = redirectByUrlHandler;
}

export const urlSimplifier = new UrlSimplifierCtrl();
