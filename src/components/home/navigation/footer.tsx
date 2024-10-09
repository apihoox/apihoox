"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  LayoutDashboard,
  LucideLinkedin,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HomeFooter = () => {
  return (
    <>
      <Separator />
      <div className="grid  gap-1 grid-cols-4 md:grid-cols-6 lg:grid-cols-12 px-1 py-1 ">
        <div className="col-span-2 text-start">
          <div className="flex  h-full w-full select-none flex-col rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <div className="flex gap-2 text-primary pb-4 lg:pl-2">
              <LayoutDashboard className="h-6 w-6" />
              <div className=" text-md font-medium">APIHooX</div>
            </div>
            <p className="text-sm leading-tight text-muted-foreground lg:pl-2 pb-4">
              Connect, Automate, Integrate
              <br />
              <br />
              With Pay-as-you-Go Pricing
            </p>
            <p className="flex place-items-center text-sm font-semibold leading-tight text-muted-foreground hover:text-primary pb-2">
              <Mail className="h-4" />
              <Link href={"mailto:info@areneva.com"}>
                info@apihoox.com
              </Link>{" "}
            </p>
            <p className="flex place-items-center text-sm leading-tight font-semibold text-muted-foreground hover:text-primary pb-2">
              <Phone className="h-4" />
              <Link href={"Tel: +91-1234567890"}> +91-1234567890</Link>{" "}
            </p>
            {/* <p className="flex place-items-center text-sm leading-tight font-semibold text-muted-foreground hover:text-primary pb-2"><MapPin className="h-4" /><Link href={"https://www.google.com/maps/place/Areneva+Technologies+(opc)+Private+Limited/@32.7034367,74.8583723,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x391e85d23527b4f3:0x99189eed3947a2af!2sAreneva+Technologies+(opc)+Private+Limited!8m2!3d32.7034322!4d74.8609472!16s%2Fg%2F11fj48nmtx!3m5!1s0x391e85d23527b4f3:0x99189eed3947a2af!8m2!3d32.7034322!4d74.8609472!16s%2Fg%2F11fj48nmtx"}> Office Location</Link> </p> */}
          </div>
        </div>
        <div className="col-span-2 text-start">
          <div className="flex h-full w-full select-none flex-col justify-start rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <p className="text-sm text-primary font-semibold pb-4">
              Industry Use-Cases
            </p>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Banking & Finance
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              E-Commerce
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Real Estate
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              IT Services
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Healthcare
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Automobile
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Software
            </Link>
            <Link
              href="/useCases"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              More
            </Link>
          </div>
        </div>
        <div className="col-span-2 text-start">
          <div className="flex h-full w-full select-none flex-col justify-start rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <p className="text-sm text-primary font-semibold pb-4">Resources</p>
            <Link
              href="/caseStudies"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Customer Studies
            </Link>
            <Link
              href="/partnerCenter"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Partner Center
            </Link>
            <Link
              href="https://docs.apihoox.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Documentation
            </Link>
            <Link
              href="https://market.apihoox.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Marketplace
            </Link>
            <Link
              href="/industries"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Industries
            </Link>
            <Link
              href="/release"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              News
            </Link>
          </div>
        </div>
        <div className="col-span-2 text-start">
          <div className="flex h-full w-full select-none flex-col justify-start rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <p className="text-sm text-primary font-semibold pb-4">Company</p>
            <Link
              href="/team"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Meet the team
            </Link>
            <Link
              href="/testimonials"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Testimonials
            </Link>
            <Link
              href="/ourImpact"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Our Impact
            </Link>
            <Link
              href="/ourPartners"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Partners
            </Link>
            <Link
              href="/aboutUs"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              About Us
            </Link>
            <Link
              href="/contactUs"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="col-span-2 text-start">
          <div className="flex h-full w-full select-none flex-col justify-start rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <p className="text-sm text-primary font-semibold pb-4">
              Playground
            </p>
            <Link
              href="/developerProgram"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Join Developer Program
            </Link>
            <Link
              href="/trainingCertifications"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Training & Certification
            </Link>
            <Link
              href="https://market.apihoox.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Sell Solutions
            </Link>
            <Link
              href="/orgSignUp"
              className="text-sm text-muted-foreground hover:text-primary pb-1"
            >
              Try Lab
            </Link>
          </div>
        </div>
        <div className="col-span-2 text-start">
          <div className="flex h-full w-full select-none flex-col justify-start rounded-md from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
            <p className="text-sm text-primary font-semibold pb-4 px-4">
              Social
            </p>
            <Link
              href=""
              className="flex text-muted-foreground hover:text-primary pb-1 place-items-center justify-start"
            >
              <Instagram className="h-4" />
              <div className=" text-sm">Instagram</div>
            </Link>
            <Link
              href=""
              className="flex text-muted-foreground hover:text-primary pb-1 place-items-center justify-start"
            >
              <Facebook className="h-4" />
              <div className=" text-sm">Facebook</div>
            </Link>

            <Link
              href=""
              className="flex text-muted-foreground hover:text-primary pb-1 place-items-center justify-start"
            >
              <LucideLinkedin className="h-4" />
              <div className=" text-sm">Linkedin</div>
            </Link>
            <Link
              href=""
              className="flex text-muted-foreground hover:text-primary pb-1 place-items-center justify-start"
            >
              <Youtube className="h-4" />
              <div className=" text-sm">Youtube</div>
            </Link>

            <div />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFooter;
