// Components
import { UrlSimplifierItem } from "@/core/url-simplifier/components/url-simplifier-list/url-simplifier-list-item";

// Utils
import { useUrlSimplifierFetch } from "@/core/url-simplifier/hooks/use-url-simplifier-fetch";

export const UrlSimplifierList = () => {
  const { loading, data: urlList, error } = useUrlSimplifierFetch();

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">URL List</h2>
      {loading && <div className="py-4 text-gray-900">Loading...</div>}

      {error && (
        <div className="p-4 bg-red-100 rounded-md mt-4">
          <p className="text-red-600">{error.message}</p>
        </div>
      )}

      {!loading && !error && !urlList.length && (
        <div className="py-4 text-gray-900">URLs list empty</div>
      )}

      {!loading && !error && urlList.length > 0 && (
        <ul className="space-y-4 mt-6">
          {urlList.map((url) => {
            return <UrlSimplifierItem key={url.id} urlSmpt={url} />;
          })}
        </ul>
      )}
    </div>
  );
};
