import Image from "next/image";
import { Statistics } from "./stats";

export const About = () => {
  return (
    <section id="about" className="container pb-12">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src="/illustrations/aboutUser.svg"
            alt=""
            width={200}
            height={200}
            className="w-[200px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                APIHooX
              </h2>
              <p className="text-md text-muted-foreground mt-4">
                APIHooX is the ultimate low-code workflow builder platform
                designed to seamlessly connect with any system that offers
                integration capabilities. Whether you&apos;re looking to
                integrate with your existing software or connect to an array of
                technology products, APIHooX makes it effortless. Being
                event-driven, APIHooX allows you to design workflows that
                accommodate all the steps you need to take to run an entire
                process end to end.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
