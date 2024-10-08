// Core
import { useState, SyntheticEvent } from "react";

// Definitions
import type { UrlSimplifierType } from "@/core/url-simplifier/types";

// Utils
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { redirectPathApi } from "@/core/url-simplifier/service";

type UrlSimplifierCreateViewProps = {
  loading: boolean;
  url: UrlSimplifierType;
  onRedirect: (v: UrlSimplifierType) => void;
};

export const UrlSimplifierCreateView = ({
  loading,
  url,
  onRedirect,
}: UrlSimplifierCreateViewProps) => {
  const [copyClipboard, setCopyClipboard] = useState(false);
  const { copy } = useCopyToClipboard();
  const fullUrl = redirectPathApi(url.shortUrl);

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
    onRedirect(url);
  };

  return (
    <div className="flex justify-between items-center mt-4 p-3 border border-gray-300 rounded-md">
      <div className="flex flex-start items-center">
        <p className="flex-0 text-gray-900">Short URL: </p>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-0 ml-2 text-blue-600 hover:text-blue-700"
          onClick={handleClick}
        >
          {loading ? "Loading ..." : url.shortUrl}
        </a>
      </div>
      <button
        className="px-3 py-1 bg-gray-200 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-300"
        onClick={() => handleCopyClipboard(fullUrl)}
      >
        {copyClipboard ? "Copied" : "Copy"}
      </button>
    </div>
  );
};
