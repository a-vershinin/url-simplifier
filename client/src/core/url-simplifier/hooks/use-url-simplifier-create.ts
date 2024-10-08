// Core
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Definitions
import type { UrlSimplifierType } from "@/core/url-simplifier/types";
import type { SetErrorFnType, SetResetFnType } from "@/utils/fill-server-errors-to-form";

// Utils
import { createUrl } from "@/core/url-simplifier/service";
import { fillServerErrorsToForm } from "@/utils/fill-server-errors-to-form";

type UseUrlSimplifierFetchType = {
  loading: boolean;
  data: UrlSimplifierType | null;
  onCreate: (p: {
    values: Pick<UrlSimplifierType, "originalUrl">;
    acts: {
      setError: SetErrorFnType<Pick<UrlSimplifierType, "originalUrl">>;
      reset: SetResetFnType;
    };
  }) => void;
};

export const useUrlSimplifierCreate = (): UseUrlSimplifierFetchType => {
  const queryClient = useQueryClient();

  const createUrlProps = useMutation({
    mutationFn: (payload: { originalUrl: string }) => createUrl(payload),
    mutationKey: ["urls/new"],
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["urls"] }),
  });

  const onCreate = useCallback(
    (payload: {
      values: Pick<UrlSimplifierType, "originalUrl">;
      acts: {
        setError: SetErrorFnType<Pick<UrlSimplifierType, "originalUrl">>;
        reset: SetResetFnType;
      };
    }) => {
      void (async () => {
        try {
          await createUrlProps.mutateAsync(payload.values);
          payload?.acts?.reset?.();
        } catch (rawErr) {
          const error = rawErr as {
            type: string;
            message: string;
            fields?: Record<string, string[]>;
          };
          if (error.type === "Validation") {
            return fillServerErrorsToForm(error.fields, payload.acts.setError);
          }
          toast.error(error.message);
        }
      })();
    },
    [createUrlProps],
  );
  const loading = createUrlProps.isPending;

  return {
    loading,
    data: createUrlProps.data || null,
    onCreate,
  };
};
