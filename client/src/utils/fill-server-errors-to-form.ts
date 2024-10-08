export type SetErrorFnType<T> = (name: keyof T, error: { type: string; message: string }) => void;
export type SetResetFnType = (
  values?: Record<string, unknown>,
  options?: Record<string, boolean>,
) => void;

export const fillServerErrorsToForm = <T = Record<string, string>>(
  errors?: { [key: string]: string[] },
  setError?: SetErrorFnType<T>,
) => {
  return (
    errors &&
    Object.keys(errors).forEach((key) => {
      setError?.(key as keyof T, {
        type: "server",
        message: errors[key][0],
      });
    })
  );
};
