// Core
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

// Definitions
import type { UrlSimplifierType } from "@/core/url-simplifier/types";

// Utils
import { getOneUrl } from "@/core/url-simplifier/service";

type UseUrlSimplifierFetchType = {
  loadingRedirect: boolean;
  onRedirect: (p: UrlSimplifierType) => void;
};

export const useUrlSimplifierRedirect = (): UseUrlSimplifierFetchType => {
  const router = useRouter();

  const redirectUrlProps = useMutation({
    mutationFn: (payload: { shortUrl: string }) => getOneUrl(payload),
    mutationKey: ["urls/redirect"],
  });

  const onRedirect = useCallback(
    (payload: UrlSimplifierType) => {
      void (async () => {
        try {
          const result = await redirectUrlProps.mutateAsync({ shortUrl: payload.shortUrl });

          await router.push(result.originalUrl);
        } catch (rawErr) {
          const error = rawErr as {
            type: string;
            message: string;
            fields?: Record<string, string[]>;
          };
          toast.error(error.message);
        }
      })();
    },
    [redirectUrlProps, router],
  );
  const loading = redirectUrlProps.isPending;

  return {
    loadingRedirect: loading,
    onRedirect,
  };
};
