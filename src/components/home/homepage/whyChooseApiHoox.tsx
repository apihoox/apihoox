import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Low-Code Workflow Builder",
    description:
      "Create, customize, and manage complex workflows without any coding hassle",
    href: "/builder",
  },
  {
    icon: <MapIcon />,
    title: "Seamless Integrations",
    description:
      "Easily integrate APIHooX into your existing systems using APIs & Webhooks",
    href: "/integrations",
  },
  {
    icon: <PlaneIcon />,
    title: "Wide Range of Connectors",
    description:
      "APIHooX offers out-of-the-box connectors to integrate with major technologies",
    href: "/connectors",
  },
  {
    icon: <GiftIcon />,
    title: "Pay-As-You-Go Pricing",
    description:
      "Only pay for what you use, with no hidden fees or long-term commitments.",
    href: "/calculator",
  },
];

export const WhyChooseAPIHooX = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center pt-24 pb-12 sm:pt-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Why Choose
        <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
          APIHooX?
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground"></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description, href }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="pb-4 text-sm">{description}</p>
              <Button>
                <Link href={href}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
