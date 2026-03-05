"use client";
import * as React from "react";
import Search from "../../../public/svg/search.svg";
import Cart from "../../../public/svg/cart.svg";
import BkIcon from "../../../public/images/BkIcon.png";
import Link from "next/link";
import SigninButton from "../common/buttons/SigninButton";
import SignupButton from "../common/buttons/SignupButton";
import { roleString } from "@/lib/roleUtils";
import { useSession } from "next-auth/react";
import { LogoutButton } from "../common/buttons/logoutButton";
import { useRouter } from "next/navigation";

const CartCount: React.FC = () => {
  return (
    <div
      id="count"
      className="flex absolute bg-blue-500 text-white border border-black rounded-lg px-1
    items-center justify-center left-4 bottom-3"
    >
      2
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [search, setSearch] = React.useState("");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    const params = new URLSearchParams();
    if (query) {
      params.set("search", query);
    }
    const url = params.toString() ? `/course?${params.toString()}` : "/course";
    router.push(url);
  };

  if (status === 'loading') return <div>Loading...</div>;

  const user = session?.user;
  sessionStorage.setItem("userID", user?.id || "");
  sessionStorage.setItem("accessToken", session?.accessToken || "");

  return (
    <header className="flex flex-wrap items-center gap-2 md:gap-4 py-2 md:py-3 px-4 md:px-6 lg:px-8 w-full text-sm md:text-base leading-none bg-white text-black shadow-sm">
      {/* Logo + Courses */}
      <div className="flex items-center gap-3 md:gap-6 shrink-0 order-1">
        <Link
          href="/"
          className="flex gap-1.5 items-center text-xl md:text-2xl text-sky-600"
        >
          <img src={BkIcon.src} alt="OpenBK" className="h-7 md:h-8 w-auto" />
          <span className="font-bold">OpenBK</span>
        </Link>
        <Link href="/course" className="text-black hover:text-sky-600 transition-colors">
          Courses
        </Link>
      </div>

      {/* Search - center on desktop, full width on mobile */}
      <form
        className="flex-1 min-w-0 order-3 md:order-2 flex items-center px-3 py-1.5 md:py-2 rounded-xl bg-stone-100 text-black/70 max-w-full md:max-w-md mx-auto"
        onSubmit={handleSearchSubmit}
      >
        <label htmlFor="search" className="sr-only">Search courses</label>
        <input
          type="search"
          id="search"
          placeholder="Search"
          className="bg-transparent border-none outline-none flex-1 min-w-0 text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search />
      </form>

      {/* Cart + User / Auth */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0 order-2 md:order-3 ml-auto">
        <div className="relative">
          <Cart />
          <CartCount />
        </div>
        {user ? (
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href={`/${roleString(user?.role)?.toLowerCase()}/dashboard`}
              className="flex items-center gap-2 min-w-0"
            >
              <img
                className="rounded-full w-8 h-8 md:w-9 md:h-9 object-cover border-2 border-gray-200 shrink-0"
                src={user?.image}
                alt=""
              />
              <span className="hidden sm:inline truncate max-w-[100px] md:max-w-[120px] font-medium">
                {user?.name ?? "User"}
              </span>
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <SigninButton />
            <SignupButton />
          </div>
        )}
      </div>
    </header>
  );
};
