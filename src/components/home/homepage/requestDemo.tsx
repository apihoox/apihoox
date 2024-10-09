import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RequestDemo = () => {
  return (
    <section id="requestDemo">
      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold mb-8">
          Want to see{"  "}
          <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
            APIHooX{"  "}
          </span>
          in Action
        </h3>

        <form className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2">
          <Input
            placeholder="yourEmail@mail.com"
            className="bg-muted/50 dark:bg-muted/80 "
            aria-label="email"
          />
          <Button>Request Demo</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
