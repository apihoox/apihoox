"use client";

import Link from "next/link";
import { LayoutDashboard, Search } from "lucide-react";
import { NavigationMenuItems } from "./navigationMenuItems";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ModeToggle from "./themeToggle";
import { ThemeColorToggle } from "./themeTypes";

const HomeNavBar = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-50 px-4 md:px-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base "
        >
          <LayoutDashboard className="h-6 w-6 " />
          <span className="sr-only">APIHooX</span>
        </Link>
        <NavigationMenuItems />
      </nav>
      <div className="flex w-full items-center gap-2 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Looking for a solution?"
              className="pl-8 sm:max-w-[200px] md:max-w-[200px] lg:max-w-[400px]"
            />
          </div>
        </form>
        <span className="h-6 w-px bg-gray-400 " aria-hidden="true" />
        <ModeToggle />
        <ThemeColorToggle />
        <span className="h-6 w-px bg-gray-400 " aria-hidden="true" />

        <Button
          onClick={() => {
            router.push("/orgSignUp");
          }}
        >
          Try Lab
        </Button>
      </div>
    </header>
  );
};

export default HomeNavBar;
