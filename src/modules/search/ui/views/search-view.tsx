import { CategoriesSection } from "../sections/categories-section";
import { ResultsSection } from "../sections/results-section";

interface SearchViewProps {
  query: string | undefined;
  categoryId: string | undefined;
};

export const SearchView = ({ query, categoryId }: SearchViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[1300px] mx-auto mb-10 pt-2.5 px-4">
      <CategoriesSection categoryId={categoryId} />
      <ResultsSection query={query} categoryId={categoryId} />
    </div>
  );
};