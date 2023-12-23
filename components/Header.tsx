import Image from "next/image";
import Link from "next/link";
import React from "react";
import Mercury from "/public/mercury.jpg";
import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./themeToggler";
import { ArrowUpRight } from "lucide-react";
const Header = () => {
  return (
<div className="">


    <div className="outline outline-1 flex justify-between  p-2 md:p-3 items-center ">
      <Link href="/" className=" px-4   flex items-center space-x-2">
        <div>
          <Image 
            src={Mercury}
            height={20}
            width={20}
            alt="logo"
            className="invert rounded-full "
          />
        </div>

        <h1 className="font-bold text-xl"> Mercury</h1>
      </Link>

      <div className=" flex px-8 space-x-4  items-center ">
      <Link className=" capitalize  flex cursor-pointer mr-8 text-lg p-1 md:mr-2 font-semibold" href="/dashboard">
    dashboard
    <ArrowUpRight  className="mt-0.5"/>
  </Link>
        <ThemeToggle/>
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
            <SignInButton afterSignInUrl="/dashboard"  mode="modal"/>
        </SignedOut>
      </div>
    </div>

    {/* <div className=" p-2 bg-gray-900 outline outline-1 py-4 items-center font-bold text-center">
    There's no limit on how far I would go, no boundaries, no lengths
    </div> */}
</div>




  );
};

export default Header;
