"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCourses } from "@/hooks/querys/useCourses";
import { RenderPublicCourses } from "@/components/ui/renderPublicCourses";
import { useSearchParams } from "next/navigation";

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
    <div className="flex overflow-hidden flex-col justify-center p-8 max-w-full bg-gray-100 rounded-3xl w-[260px] max-md:px-5">
      <div className="self-start text-xl font-bold leading-none text-black">
        {title}
      </div>
      <div className="flex overflow-hidden flex-col mt-5 w-full">
        <RadioGroup
          className="flex overflow-hidden flex-col items-start w-full text-base text-black"
          value={selectedValue}
          onValueChange={onChange}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex overflow-hidden text-m gap-2 items-center first:mt-0"
            >
              <RadioGroupItem value={item.value}></RadioGroupItem>
              {item.label}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav
      className="flex gap-2.5 justify-between items-center text-base tracking-wide text-center text-neutral-950"
      role="navigation"
      aria-label="Pagination"
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`self-stretch px-0.5 my-auto h-[33px] min-h-[33px] rounded-[30px] w-[33px] border border-black border-solid focus:outline-none focus:ring-2 focus:ring-sky-600 ${
            currentPage === page ? "text-white bg-sky-600" : "bg-gray-100"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
        >
          <span className="font-bold">{page}</span>
        </button>
      ))}
    </nav>
  );
};


export default function Page(){

  const searchParams = useSearchParams();
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
    setSearchQuery(nextSearch);
    setCurrentPage(1);
  }, [searchParams]);

  const { data: courses } = useCourses({
    search: searchQuery || undefined,
    category: selectedCategory === "ALL" ? undefined : selectedCategory,
    priceType: selectedPrice === "ALL" ? undefined : selectedPrice,
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    setCurrentPage(1);
  };

  const totalCourses = courses?.length ?? 0;
  const totalPages = totalCourses > 0 ? Math.ceil(totalCourses / pageSize) : 1;
  const current = Math.min(currentPage, totalPages);
  const startIndex = totalCourses === 0 ? 0 : (current - 1) * pageSize + 1;
  const endIndex = totalCourses === 0 ? 0 : Math.min(totalCourses, current * pageSize);

  return (
    <main className="flex flex-col bg-white">
      <div className="flex overflow-hidden flex-wrap gap-8 px-5 py-6 w-full max-md:max-w-full">
        <aside className="flex overflow-hidden flex-col items-end px-8 py-2.5 text-center min-w-[240px] w-[348px] max-md:px-5">
          <FilterSection
            title="Categories"
            items={categories}
            selectedValue={selectedCategory}
            onChange={handleCategoryChange}
          />
          <div className="mt-8">
            <FilterSection
              title="Price"
              items={prices}
              selectedValue={selectedPrice}
              onChange={handlePriceChange}
            />
          </div>
        </aside>

        <section className="flex overflow-hidden flex-col flex-1 shrink self-start px-2.5 pt-2.5 basis-10 min-h-[812px] min-w-[240px] max-md:max-w-full">
          <h1 className="self-start text-2xl font-bold text-center text-black">
            Courses in Development
          </h1>
          <div className="flex overflow-hidden self-stretch pt-2 mt-2 w-full text-base text-center text-black min-h-[40px] max-md:max-w-full">
            {totalCourses > 0
              ? `Showing ${startIndex}-${endIndex} of ${totalCourses} Results`
              : ""}
          </div>

          <div
            id="Course lists"
            className="grid grid-cols-3 px-2 gap-8 w-full max-md:max-w-full"
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
              currentPage={current}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
