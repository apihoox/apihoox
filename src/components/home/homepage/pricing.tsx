"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number | string;
  href: string;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Labs",
    popular: 0,
    price: "Free",
    href:"/orgSignUp",
    description:
      "Our labs are a perfect place to build, test and deploy new solutions before deploying to production.",
    buttonText: "Try Labs",
    benefitList: [
      "3 active HooX",
      "Resets in 30 days",
      "30 executions per day",
      "100 steps per day",
      "Build Solutions",
      "Migrate to Production Requestor",
      "Submit to Marketplace for approval",
    ],
  },
    {
        title: "Standard",
        popular: 0,
        price: 15,
        href:"/registration",
        description:
          "Our standard plan is dedicated to micro businesses, solopreneurs and gig workers that are starting out",
        buttonText: "Try Standard",
        benefitList: [
          "3 Users",
          "Groups",
          "3 months HooX history",
          "10 Active HooX",
          "5 API calls/sec Limit",
          "2000 Executions included",
          "10000 steps included",
          "Pay-as-you-Go pricing"
        ],
      },

  {
    title: "Professional",
    popular: 1,
    price: 29,
    href:"/registration",
    description:
      "Our professional plan is for small & medium sized organisations with growing loads ",
    buttonText: "Try Professional",
    benefitList: [
      "10 Users",
      "Groups",
      "Pollers",
      "Functions",
      "3 months HooX history",
      "15 Active HooX",
      "20 API calls/sec Limit",
      "3000 Executions included",
      "30000 steps included",
      "Pay-as-you-Go pricing"

    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: "Custom",
    href:"/contactUs",
    description:
      "Our Enterprise plan is a custom plan that caters to the needs and requirements of the enterprise",
    buttonText: "Contact US",
    benefitList: [
      "Everything in Pro +",
      "Dedicated Support",
      "Custom Security Policy",
      "Dedicated Server",
      "Custom Data Policy",
      "Custom API Rate Limit",
      "Professional Services",
      "Prioritized Feature Requests",
      "Custom Reports"
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container pb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Our
        <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
          {" "}
          Pricing{" "}
        </span>

      </h2>
      <h3 className="text-lg text-center text-muted-foreground pt-4 pb-8">
        Our Pricing is divided into two components: Platform cost & Usage cost.<br/>
        Use our <Link href={"/pricing"} className="text-primary transition-all border-primary hover:border-b-2">Pricing calculator</Link>  to get the pricing for your expected usage.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                {typeof pricing.price === 'number' ? (
                  <>
                      <span className="text-3xl font-bold">${pricing.price}</span>
                      <span className="text-muted-foreground"> +/month</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">{pricing.price}</span>
                  )}
              </div>


              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full"><Link href={pricing.href}>{pricing.buttonText}</Link></Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check/>{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};