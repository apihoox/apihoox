"use client";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useThemeContext } from "@/components/platform/theme/themedataProvider";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {availableThemeColors.map(({ name, light, dark }) => (
          <DropdownMenuItem
            key={name}
            onClick={() => setThemeColor(name as ThemeColors)}
          >
            <div className="flex item-center space-x-3">
              <div
                className={cn(
                  "rounded-full",
                  "w-[20px]",
                  "h-[20px]",
                  theme === "light" ? light : dark
                )}
              ></div>
              <div className="text-sm">{name}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
