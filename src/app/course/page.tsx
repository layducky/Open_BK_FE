"use client";
import * as React from "react";
import { Suspense } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCourses } from "@/hooks/querys/useCourses";
import { RenderPublicCourses } from "@/components/ui/renderPublicCourses";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/common/pagination";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { MinDelay } from "@/components/ui/MinDelay";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";

interface FilterItem {
  id: number;
  label: string;
  value: string;
}

const categories: FilterItem[] = [
  { id: 1, label: "All Category", value: "ALL" },
  { id: 2, label: "Math", value: "MATH" },
  { id: 3, label: "English", value: "ENGLISH" },
  { id: 4, label: "Code", value: "CODE" },
  { id: 5, label: "Art", value: "ART" },
];

const prices: FilterItem[] = [
  { id: 1, label: "All Price", value: "ALL" },
  { id: 2, label: "Free", value: "FREE" },
  { id: 3, label: "Paid", value: "PAID" },
];
const FilterSection: React.FC<{
  title: string;
  items: FilterItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}> = ({ title, items, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col flex-1 min-w-[140px] p-5 bg-gray-50 rounded-2xl border border-gray-200/80 shadow-sm">
      <div className="text-base font-semibold text-slate-800 mb-4">
        {title}
      </div>
      <RadioGroup
        className="flex flex-col items-start gap-3 w-full text-sm text-slate-700"
        value={selectedValue}
        onValueChange={onChange}
      >
        {items.map((item) => (
          <label
            key={item.id}
            className="flex gap-2.5 items-center cursor-pointer hover:text-slate-900 transition-colors"
          >
            <RadioGroupItem value={item.value} />
            {item.label}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

function CoursePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState<string>(""); 
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    searchParams.get("category") ?? "ALL"
  );
  const [selectedPrice, setSelectedPrice] = React.useState<string>(
    searchParams.get("price") ?? "ALL"
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 6;

  React.useEffect(() => {
    const nextSearch = searchParams.get("search") ?? "";
    const nextCat = searchParams.get("category") ?? "ALL";
    const nextPrice = searchParams.get("price") ?? "ALL";
    setSearchQuery(nextSearch);
    setSelectedCategory(nextCat);
    setSelectedPrice(nextPrice);
    setCurrentPage(1);
  }, [searchParams]);

  const { data: courses, isLoading } = useCourses({
    search: searchQuery || undefined,
    category: selectedCategory === "ALL" ? undefined : selectedCategory,
    priceType: selectedPrice === "ALL" ? undefined : selectedPrice,
  });

  const updateUrl = React.useCallback(
    (updates: { category?: string; price?: string; search?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.category !== undefined) {
        if (updates.category === "ALL") params.delete("category");
        else params.set("category", updates.category);
      }
      if (updates.price !== undefined) {
        if (updates.price === "ALL") params.delete("price");
        else params.set("price", updates.price);
      }
      if (updates.search !== undefined) {
        if (!updates.search.trim()) params.delete("search");
        else params.set("search", updates.search);
      }
      params.delete("page");
      const q = params.toString();
      router.replace(q ? `/course?${q}` : "/course", { scroll: false });
    },
    [searchParams, router]
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    updateUrl({ category: value });
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    setCurrentPage(1);
    updateUrl({ price: value });
  };

  const showLoading = useMinimumLoading(isLoading);
  if (showLoading) return <LoadingScreen message="Loading courses..." />;

  const totalCourses = courses?.length ?? 0;
  const totalPages = Math.max(1, totalCourses > 0 ? Math.ceil(totalCourses / pageSize) : 1);
  const current = Math.min(currentPage, totalPages);
  const startIndex = totalCourses === 0 ? 0 : (current - 1) * pageSize + 1;
  const endIndex = totalCourses === 0 ? 0 : Math.min(totalCourses, current * pageSize);

  return (
    <main className="flex flex-col bg-white min-w-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row flex-wrap gap-6 lg:gap-8 px-4 sm:px-6 py-6 w-full min-w-0">
        <aside className="flex flex-row lg:flex-col gap-4 shrink-0 w-full lg:w-[280px] max-w-full min-w-0 items-stretch">
          <FilterSection
            title="Categories"
            items={categories}
            selectedValue={selectedCategory}
            onChange={handleCategoryChange}
          />
          <FilterSection
            title="Price"
            items={prices}
            selectedValue={selectedPrice}
            onChange={handlePriceChange}
          />
        </aside>

        <section className="flex flex-col flex-1 min-w-0 basis-0">
          <h1 className="text-2xl font-bold text-black">
            Courses in Development
          </h1>
          <div className="pt-2 text-base text-black min-h-[24px]">
            {totalCourses > 0
              ? `Showing ${startIndex}-${endIndex} of ${totalCourses} Results`
              : ""}
          </div>

          <div
            id="Course lists"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full min-w-0 justify-items-center"
          >
            <RenderPublicCourses
              courses={courses}
              start={(current - 1) * pageSize}
              end={current * pageSize}
              viewType="PREVIEW-COURSE"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={Math.min(currentPage, totalPages)}
              totalPages={Math.max(1, totalPages)}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Page() {
  const mountTimeRef = React.useRef(Date.now());
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MinDelay startTime={mountTimeRef.current}>
        <CoursePageContent />
      </MinDelay>
    </Suspense>
  );
}
