// Core
import { useQuery } from "@tanstack/react-query";

// Definitions
import type { UrlSimplifierType } from "@/core/url-simplifier/types";

// Utils
import { fetchUrls } from "@/core/url-simplifier/service";

type UseUrlSimplifierFetchType = {
  loading: boolean;
  data: UrlSimplifierType[];
  error: { type: string; message: string } | null;
};

export const useUrlSimplifierFetch = (): UseUrlSimplifierFetchType => {
  const queryProps = useQuery<UrlSimplifierType[], { type: string; message: string }>({
    queryKey: ["urls"],
    queryFn: () => fetchUrls(),
  });
  const loading = queryProps.isFetching;
  const error = queryProps.error;
  const data = queryProps.data || [];

  return {
    loading,
    error,
    data,
  };
};
