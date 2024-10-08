// Components
import { UrlSimplifierCreateForm } from "@/core/url-simplifier/components/url-simplifier-create-form";
import { UrlSimplifierCreateView } from "@/core/url-simplifier/components/url-simplifier-create-view";

// Utils
import { useUrlSimplifierCreate } from "@/core/url-simplifier/hooks/use-url-simplifier-create";
import { useUrlSimplifierRedirect } from "@/core/url-simplifier/hooks/use-url-simplifier-redirect";

export const UrlSimplifierCreate = () => {
  const { loading, data, onCreate } = useUrlSimplifierCreate();
  const { loadingRedirect, onRedirect } = useUrlSimplifierRedirect();

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-gray-900">URL Simplifier</h2>
      <UrlSimplifierCreateForm loading={loading} onSubmit={onCreate} />
      {data && (
        <UrlSimplifierCreateView loading={loadingRedirect} url={data} onRedirect={onRedirect} />
      )}
    </div>
  );
};
