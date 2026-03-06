"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { getAllCourses } from "@/services/course";
import type { PublicCourseEntity } from "@/type/course.entity";

const DEBOUNCE_MS = 220;
const MAX_RESULTS = 5;

function matchesSearch(course: PublicCourseEntity, query: string): boolean {
  if (!query.trim()) return false;
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const name = (course.courseName ?? "").toLowerCase();
  const category = (course.category ?? "").toLowerCase();
  const desc = (course.description ?? "").toLowerCase();
  const author = (course.authorInfo?.name ?? "").toLowerCase();
  const searchable = `${name} ${category} ${desc} ${author}`;

  return terms.every((term) => searchable.includes(term));
}

/** Lọc kết quả case-insensitive, tối đa 5 */
function filterAndLimit(
  courses: PublicCourseEntity[],
  query: string
): PublicCourseEntity[] {
  if (!courses.length || !query.trim()) return [];
  return courses.filter((c) => matchesSearch(c, query)).slice(0, MAX_RESULTS);
}

/** Cache key cho bộ lọc category + price */
function getFilterKey(category: string, priceType: string): string {
  return `${category ?? "ALL"}|${priceType ?? "ALL"}`;
}

export const CourseSearchDropdown: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "ALL";
  const priceType = searchParams.get("price") ?? "ALL";
  const filterKey = pathname === "/course" ? getFilterKey(category, priceType) : "ALL|ALL";

  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<PublicCourseEntity[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cacheRef = React.useRef<{ key: string; data: PublicCourseEntity[] }>({ key: "", data: [] });

  const fetchAndFilter = React.useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const cat = category === "ALL" ? undefined : category;
      const price = priceType === "ALL" ? undefined : priceType;
      const filters = { category: cat, priceType: price };

      try {
        if (cacheRef.current.key !== filterKey || cacheRef.current.data.length === 0) {
          setIsLoading(true);
          const data = await getAllCourses(filters);
          const list = Array.isArray(data) ? data : [];
          cacheRef.current = { key: filterKey, data: list };
        }
        const filtered = filterAndLimit(cacheRef.current.data, query);
        setResults(filtered);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [filterKey, category, priceType]
  );

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!search.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setIsOpen(true);
      fetchAndFilter(search);
      debounceRef.current = null;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, fetchAndFilter]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (pathname === "/course") {
      if (category !== "ALL") params.set("category", category);
      if (priceType !== "ALL") params.set("price", priceType);
    }
    const q = params.toString();
    router.push(q ? `/course?${q}` : "/course");
    setIsOpen(false);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setSearch("");
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <form
        className="flex items-center px-3 py-1.5 md:py-2 rounded-xl bg-stone-100 text-black/70 max-w-full md:max-w-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="course-search" className="sr-only">
          Search for courses
        </label>
        <input
          id="course-search"
          type="search"
          placeholder="Search for courses..."
          className="bg-transparent border-none outline-none flex-1 min-w-0 text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button type="submit" className="p-1 hover:opacity-70 transition-opacity" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </form>

      {isOpen && search.trim() && (
        <div
          className="absolute top-full left-0 right-0 mt-1 z-50 min-w-[280px] max-w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
          role="listbox"
        >
          {isLoading ? (
            <div className="py-6 px-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-6 px-4 text-center text-sm text-gray-500">
              Không tìm thấy khóa học
            </div>
          ) : (
            <ul className="py-1 max-h-[320px] overflow-y-auto">
              {results.map((course) => (
                <li key={course.courseID} role="option">
                  <Link
                    href={`/course/${course.courseID}/overview`}
                    onClick={handleResultClick}
                    className="flex gap-3 px-3 py-2.5 hover:bg-stone-100 transition-colors"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-black truncate">
                        {course.courseName}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {course.category} • {course.authorInfo?.name}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
