import { CategoriesSection } from "../sections/categories-section";
import { HomeVideosSection } from "../sections/home-videos-section";

interface HomeViewProps {
  categoryId?: string;
};

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto px-4 pt-[4rem]">
      <CategoriesSection categoryId={categoryId} />
      <HomeVideosSection categoryId={categoryId} />
    </div>
  );
};