"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LayoutDashboard } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Administration",
    href: "/solutions",
    description:
      "Explore our solutions for the core teams running the administration",
  },
  {
    title: "CRM Operations",
    href: "/solutions",
    description:
      "Explore our solutions for the Sales, Marketing & Support operations",
  },
  {
    title: "IT & Security Operations",
    href: "/solutions",
    description:
      "Explore our solutions for the core IT Teams managing the Infra & security",
  },
  {
    title: "Cloud Operations",
    href: "/solutions",
    description:
      "Check how we are enabling the cloudOps to orchestrate operations",
  },
  {
    title: "Development",
    href: "/solutions",
    description:
      "Explore how we cut down your TCO significantly while delivering high ROI",
  },
  {
    title: "Integrations",
    href: "/solutions",
    description:
      "Our solutions can be integrated into any software that supports integration",
  },
];

export function NavigationMenuItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted from-muted/50 to-muted px-6 py-4 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="flex gap-2 place-items-center justify-start pb-4">
                      <LayoutDashboard className="h-6 w-6" />
                      <div className=" text-lg font-medium">APIHooX</div>
                    </div>

                    <p className="text-sm leading-tight text-muted-foreground pb-2">
                      Connect, Automate, Integrate
                    </p>
                    <p className="text-sm leading-tight text-muted-foreground">
                      With Pay-as-you-Go Pricing
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/product" title="Product">
                Explore our core capabilities and ecosystem
              </ListItem>
              <ListItem href="/release" title="What's New?">
                Check our latest news, updates and releases
              </ListItem>
              <ListItem
                href="https://docs.apihoox.com"
                target="_blank"
                title="Documentation"
              >
                Find our trainings, quick-start guide and other documentation
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/calculator" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing Calculator
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
