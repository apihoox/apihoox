"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header-label";

import BackButton from "./back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonLabel: string;
  backButtonHref: string;

  className?: string;
}

const CardWrapper = ({
  children,
  headerlabel,
  backButtonLabel,
  backButtonHref,
  className,
}: CardWrapperProps) => {
  return (
    <div className={cn("", className)}>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <Header label={headerlabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
