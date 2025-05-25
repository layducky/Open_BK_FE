"use client";
import * as React from "react";
import Search from "@/public/svg/search.svg";
import Cart from "@/public/svg/cart.svg";
import BkIcon from "@/public/images/BkIcon.png";
import Link from "next/link";
import SigninButton from "../common/buttons/SigninButton";
import SignupButton from "../common/buttons/SignupButton";
import { roleString } from "@/lib/roleUtils";
import { useUser } from "@/hooks/useUser";
import { UserEntity } from "@/domain/user.entity";
import { LogoutButton } from "../common/buttons/logoutButton";

const CartCount: React.FC = () => {
  return (
    <div
      id="count"
      className="flex absolute bg-blue-500 text-white border-1 border-black rounded-lg px-1 w-25
    items-center justify-center left-4 bottom-3"
    >
      2
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { data, isLoading, isError } = useUser();
  const [user, setUser] = React.useState<UserEntity>();

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error loading user</div>;
  }
  

  return (
    <div className="flex overflow-hidden flex-wrap items-center py-4 pl-8 w-full text-base leading-none bg-white text-black shadow-sm max-md:pl-5 max-md:max-w-full">
      <div className="w-3/12 flex justify-start" >
        <Link
          href="/"
          className="flex gap-1.5 justify-center items-center pl-0 text-2xl w-4/6 text-sky-600"
        >
          <img src={BkIcon.src} className=""></img>
          <span className="font-bold">OpenBK</span>
        </Link>

        <Link href="/course" className="self-stretch my-auto w-2/6 tracking-wide">
          Courses
        </Link>
      </div>

      <div className="w-6/12 flex justify-center" >
        <form className="flex flex-wrap gap-10 justify-between items-center self-stretch px-4 py-2 my-auto tracking-wide whitespace-nowrap rounded-2xl bg-stone-100 min-w-[240px] text-black text-opacity-70 w-[607px] max-md:px-5 max-md:max-w-full">
          <label htmlFor="search" className="sr-only">
            Search courses
          </label>
          <div className="flex items-center w-full">
            <input
              type="search"
              id="search"
              placeholder="Search"
              className="bg-transparent border-none outline-none flex-grow"
            />
            <Search />
          </div>
        </form>
      </div>

      <div className="w-3/12 flex gap-4 justify-between items-center self-stretch my-auto tracking-wide min-w-[240px] w-[325px]">
        <div className="w-2/6 relative">
          <Cart />
          <CartCount />
        </div>
        <div className="w-4/6 flex justify-between">
          {user ? (
            <div className="flex items-center gap-10 justify-around ">
              <div className="w-4/6">                
                <Link
                  href={`/${roleString(user?.role)?.toLowerCase()}/dashboard`}
                  className="self-stretch my-auto tracking-wide"
                >
                  <div className="flex flex-col justify-center">
                    <img
                      className="rounded-full bg-black w-10 aspect-square object-cover border-[6px] border-white"
                      src={user?.imageUrl}
                    />
                    <button className="self-stretch my-auto">{user?.name ?? "Your name"}</button>
                  </div>
                </Link>
              </div>
              <div className="flex justify-center w-2/6">
                <LogoutButton />
              </div>
            </div>
            
          ) : (
            <>
              <div className="flex justify-center gap-10">
                <SigninButton />
                <SignupButton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
