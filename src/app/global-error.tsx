"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
                height={400}
                className="w-[300px] object-contain rounded-lg"
              />
              <div className="bg-green-0 flex flex-col justify-between w-full">
                <div className="pb-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
                      Something{" "}
                    </span>
                    Went Wrong
                  </h2>
                  <p className="text-md text-muted-foreground mt-4">
                    Internal Server Error. If this continues, please contact
                    support.
                  </p>
                  <Button
                    className="mt-4"
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
