// Core
import { useState, SyntheticEvent } from "react";

// Definitions
import { UrlSimplifierType } from "@/core/url-simplifier/types";

// Utils
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { redirectPathApi } from "@/core/url-simplifier/service";
import { useUrlSimplifierRedirect } from "@/core/url-simplifier/hooks/use-url-simplifier-redirect";

type UrlSimplifierItemProps = {
  urlSmpt: UrlSimplifierType;
};

export const UrlSimplifierItem = ({ urlSmpt }: UrlSimplifierItemProps) => {
  const [copyClipboard, setCopyClipboard] = useState(false);
  const { copy } = useCopyToClipboard();
  const { loadingRedirect, onRedirect } = useUrlSimplifierRedirect();

  const fullUrl = redirectPathApi(urlSmpt.shortUrl);

  const handleCopyClipboard = (value: string) => {
    copy(value)
      .then(() => {
        console.log("URL copied to clipboard!", value);
        setCopyClipboard(true);
        setTimeout(() => {
          setCopyClipboard(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  const handleClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onRedirect(urlSmpt);
  };

  return (
    <li className="p-3 border border-gray-300 rounded-md">
      <div className="flex justify-start items-start">
        <div className="flex-auto flex justify-between items-start">
          <p className="flex- text-gray-900">Origin URL:</p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex-auto ml-2 text-blue-600 hover:text-blue-700"
            href={urlSmpt.originalUrl}
          >
            {urlSmpt.originalUrl}
          </a>
        </div>
        <div className="flex-1 flex flex-start items-start ml-2">
          <p className="flex-0 text-gray-900">Short URL:</p>
          <a
            className="flex-0 ml-2 text-blue-600 hover:text-blue-700"
            href={urlSmpt.shortUrl}
            onClick={handleClick}
          >
            {loadingRedirect ? "Loading ..." : urlSmpt.shortUrl}
          </a>
        </div>

        <button
          className="flex-0 justify-self-end ml-2 px-3 py-1 bg-gray-200 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-300"
          onClick={() => handleCopyClipboard(fullUrl)}
        >
          {copyClipboard ? "Copied" : "Copy"}
        </button>
      </div>
    </li>
  );
};
