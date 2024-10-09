import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { BedDouble, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="/avatars/02.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Bob Green</CardTitle>
            <CardDescription>SMB Owner</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          I was finally able to integrate my shopify events into our CRM
        </CardContent>
      </Card>

      {/* Review */}
      <Card className="absolute -right-[10px] top-4 w-[350px] flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
            src="/illustrations/jerrySmith.svg"
            alt="user avatar"
            height={300}
            width={300}
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Jerry Smith</CardTitle>
          <CardDescription className="font-normal text-primary">
            Business Owner
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2 text-sm">
          <p>
            We were paying 100s of $ for one integration and now we get 6x-8x of
            the value at around 1/4th the price
          </p>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Lab
            <Badge variant="secondary" className="text-sm text-primary">
              Free Forever
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">Free</span>
          </div>

          <CardDescription>
            Our labs are a perfect place to experiment with new integrations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">
            <Link href={"/orgSignUp"}>Try Lab</Link>
          </Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "3 active HooX",
              "Resets in 30 days",
              "30 executions per day",
              "100 steps per day",
            ].map((benefit: string) => (
              <span key={benefit} className="flex">
                <Check className="" /> <h3 className="ml-2">{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Mode */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[90px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="/avatars/01.png" />
            <AvatarFallback>PT</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Mellissa</CardTitle>
            <CardDescription>Consultant</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          I&apos;m able to share my solutions to a wider audience and earn a
          royalty fee
        </CardContent>
      </Card>
      {/* Testimonial */}
      <Card className="absolute w-[390px] -right-[50px] -bottom-[55px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/10 p-2 rounded-full">
            <BedDouble />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-sm mt-2">
              The UI automatically defaults to system settings so that it&apos;s
              easy on your eyes
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
