// Components
import { UrlSimplifierCreate } from "@/core/url-simplifier/components/url-simplifier-create";
import { UrlSimplifierList } from "@/core/url-simplifier/components/url-simplifier-list";

export const UrlSimplifier = () => {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white">
      <UrlSimplifierCreate />
      <UrlSimplifierList />
    </section>
  );
};
