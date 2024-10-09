"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const TryLabs = () => {
  const router = useRouter();
  return (
    <section id="cta" className="bg-muted/50 py-16 w-full rounded-lg">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1 ml-8">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Build {">"}
            <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
              {" "}
              Test {">"}{" "}
            </span>
            Deploy
          </h2>
          <p className="text-muted-foreground text-md mt-4 mb-8  lg:mb-0">
            Our labs provide a space to build and test your solutions before
            deploying them to production. Free forever, with a 30-day retention
            policy.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto">
            {" "}
            <Link href={"/orgSignUp"}>Try Labs</Link>{" "}
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <Link href={"/labsDetails"}>Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
