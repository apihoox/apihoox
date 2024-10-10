"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PhoneInput } from "@/components/customUi/phoneInput";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { redirect, useRouter } from "next/navigation";

import { startTransition, useState } from "react";

import { tenantSchema } from "@/lib/typeSchemas/types";

import { FormError } from "@/components/platform/ui/form-error";
import { FormSuccess } from "@/components/platform/ui/form-success";

import { IconCloudPage } from "@/components/home/homepage/iconCloud";
import { orgSetUp } from "./_actions/orgSetUp";
import Loading from "@/app/loading";
import useAuthCall from "@/hooks/isUserAuthenticated";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof tenantSchema>>({
    mode: "onChange",
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      tenant_name: "",
      owner_first_name: "",
      owner_last_name: "",
      owner_email: "",
      owner_phone: "",
    },
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      orgSetUp(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
            console.log(data);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            // console.log(data.response.id);
            router.push(
              `/orgSignUp/setPassword?tenant_id=tenant_${data.response.id}&user_email=${data.response.owner_email}&user_first_name=${data.response.owner_first_name}&user_last_name=${data.response.owner_last_name}`
            );
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
    setLoading(false);
  };

  const { user, isLoading } = useAuthCall();
  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return redirect("/platform");
  }

  return (
    <div className="w-full grid min-h-screen lg:grid-cols-2">
      <title>Register lab | APIHooX</title>
      <div className="hidden bg-muted lg:block">
        <IconCloudPage />
      </div>
      <div className="flex flex-grow items-center justify-center py-12">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter below information to sign up for a lab
            </CardDescription>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 text-left"
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <FormField
                        disabled={loading}
                        control={form.control}
                        name="owner_first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name*</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="First Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        disabled={loading}
                        control={form.control}
                        name="owner_last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name*</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Last Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="tenant_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organisation name*</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ABC Corp." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="owner_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="mail@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="owner_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone*</FormLabel>
                          <FormControl>
                            <PhoneInput
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                // do your own change event
                              }}
                              defaultCountry="IN"
                              placeholder="10 digit phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full mt-6"
                  >
                    Create an account
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
