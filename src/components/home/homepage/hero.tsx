"use client";
import { Button } from "@/components/ui/button";
import { HeroCards } from "./heroCards";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <section className="container grid lg:grid-cols-2 place-items-center pt-20 md:pt-32 gap-10">
      <div className="text-center lg:text-center space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#f473c7] via-[#f833b3]  to-[#db09bf] text-transparent bg-clip-text">
              Connect&nbsp;
            </span>
          </h2>
          <br />
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-primary/70 via-primary/85 to-primary text-transparent bg-clip-text">
              Automate&nbsp;
            </span>
          </h2>
          <br />
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Integrate
            </span>
          </h2>
        </main>

        <p className="text-md text-muted-foreground max-w-[75%] mx-auto">
          The ultimate low-code workflow platform designed to seamlessly
          integrate with any system that offers API capabilities.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-1/3"
            onClick={() => {
              router.push("/login");
            }}
          >
            Sign In
          </Button>
          <Button
            variant={"outline"}
            className="w-full md:w-1/3"
            onClick={() => {
              router.push("/registration");
            }}
          >
            Sign Up for βeta
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
