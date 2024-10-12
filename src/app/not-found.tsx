"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Custom404() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex z-10 min-w-full items-center justify-center">
        <section id="about" className="container pb-12">
          <div className="bg-muted/50 border rounded-lg py-12">
            <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
              <Image
                src="/illustrations/aboutUser.svg"
                alt=""
                width={300}
                height={300}
                className="w-[300px] object-contain rounded-lg"
              />
              <div className="bg-green-0 flex flex-col justify-between w-full">
                <div className="pb-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
                      Page{" "}
                    </span>
                    Not Found
                  </h2>
                  <p className="text-md text-muted-foreground mt-4">
                    The requested page has either been moved or does not exist
                    in our system. If this looks like a problem, contact support
                  </p>
                  <form className="flex flex-col w-full lg:px-8 md:flex-row pt-8 mx-auto gap-4 md:gap-2">
                    <Input
                      placeholder="Looking for something?"
                      className="bg-muted/50 dark:bg-muted/80"
                      aria-label="email"
                    />
                  </form>
                  <Button
                    className="mt-8"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
