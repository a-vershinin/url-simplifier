// Core
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SetErrorFnType, SetResetFnType } from "@/utils/fill-server-errors-to-form";

const formShapes = {
  shape: {
    originalUrl: "",
  },
  schema: () =>
    z.object({
      originalUrl: z.string().trim(),
    }),
};

type UrlSimplifierCreateFormProps = {
  loading?: boolean;
  onSubmit?: (data: {
    values: { originalUrl: string };
    acts: { setError: SetErrorFnType<{ originalUrl: string }>; reset: SetResetFnType };
  }) => void;
};

export const UrlSimplifierCreateForm = (props: UrlSimplifierCreateFormProps) => {
  const { loading, onSubmit } = props;

  const formProps = useForm<{ originalUrl: string }>({
    defaultValues: {
      ...formShapes.shape,
    },
    resolver: zodResolver(formShapes.schema()),
    mode: "all",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = formProps;

  const handleSubmitForm = handleSubmit((values): void => {
    onSubmit?.({ values, acts: { setError, reset } });
  });

  const onSubmitForm = (event: SyntheticEvent) => {
    void (async () => {
      await handleSubmitForm(event);
    })();
  };

  const isActive = !isDirty || !isValid;

  return (
    <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="originalUrl" className="text-gray-900">
            URL
          </label>
          <input
            {...register("originalUrl")}
            id="originalUrl"
            name="originalUrl"
            className={`flex-1 p-3 text-gray-700 border border-gray-300 rounded-md ${
              errors.originalUrl ? "border-red-600" : ""
            }`}
            placeholder="Enter your URL"
          />
          {errors.originalUrl && <p className="text-red-600">{errors.originalUrl.message}</p>}
        </div>
      </div>
      <button
        className={`w-1/4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
          isActive ? "bg-gray-600 hover:bg-gray-600" : ""
        }`}
        type="submit"
        disabled={isActive}
      >
        {loading ? "Loading..." : "Simplify"}
      </button>
    </form>
  );
};
