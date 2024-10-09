import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

  interface FAQProps {
    question: string;
    answer: string;
    value: string;
  }

  const FAQList: FAQProps[] = [
    {
      question: "Is labs totally free? Do, I need to share my credit card details?",
      answer: "Yes, Our labs are absolutely free forever. We even provide you with some credits to help you build and test your solutions, which is also great for new learners. No credit card details are required when you sign up for a lab. If the free limit isn't sufficient, you can purchase additional data bundles, but that's entirely up to you.",
      value: "item-1",
    },
    {
      question: "What if my included limit is depleted?",
      answer:
        "You will receive notifications at 75%, 90%, and 100% usage thresholds. If you have disabled Pay-as-you-Go, your HooX Flow will automatically be disabled for the current billing period. To re-enable it, you will need to enable Pay-as-you-Go from settings or raise a support ticket.",
      value: "item-2",
    },
    {
      question:
        "What if I need more HooX than included in the plan?",
      answer:
        "You can purchase a minimum bundle that includes 5 active HooX, 1000 executions, and 5000 steps, or choose a larger bundle based on your requirements.",
      value: "item-3",
    },
    {
      question: "How is this Pay-as-you-Go pricing if I still have to pay for licenses?",
      answer: "Our licensing fees are divided into two parts: Platform Fees, which are upfront to support ongoing operations, maintenance, and further development of APIHooX; and Execution Fees, ensuring you can run heavy workloads without concerns about a hefty bill",
      value: "item-4",
    },
    {
      question:
        "What if I want to close my contract?",
      answer:
        "We would be sorry to see you leave. If you are on a monthly plan, your subscription will remain active until the end of the current month and discontinue thereafter. For annual plans, if you decide to cancel in the 7th month of a $300/year plan, you would be refunded for the last quarter (3 months), adjusted against the monthly rate of $29/month for the current year's usage (7 months + the remaining quarter). This means you would be charged $261 for the 9 months used, with your subscription discontinuing from the 10th month, and you would receive a $39 refund.",
      value: "item-5",
    },
  ];

  export const FAQ = () => {
    return (
      <section
        id="faq"
        className="container py-12 sm:py-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem
              key={value}
              value={value}
            >
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent className="text-sm leading-tight text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="font-medium mt-4">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href="/contactUs"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </section>
    );
  };