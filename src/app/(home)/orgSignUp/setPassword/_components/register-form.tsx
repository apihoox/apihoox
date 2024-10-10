"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";
import { FormError } from "@/components/platform/ui/form-error";
import { FormSuccess } from "@/components/platform/ui/form-success";
import { RegisterOrgSchema } from "@/lib/typeSchemas/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { registerTenant } from "@/app/(home)/(auth)/login/_actions/authActions";

type data = {
  tenant_id: string | null;
  user_email: string | null;
  user_first_name: string | null;
  user_last_name: string | null;
};

const SetPasswordFormPage = ({
  tenant_id,
  user_email,
  user_first_name,
  user_last_name,
}: data) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterOrgSchema>>({
    resolver: zodResolver(RegisterOrgSchema),
    defaultValues: {
      tenant_id: tenant_id || "",
      user_email: user_email || "",
      hashed_password: "",
      confirm_password: "",
      user_first_name: user_first_name || "",
      user_last_name: user_last_name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterOrgSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerTenant(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          router.push("/platform");
        }
      });
    });
    form.reset();
  };
  return (
    <Card className="w-[450px] ">
      <CardHeader className="text-center">Set Password</CardHeader>
      <Separator />
      <CardContent className="items-center justify-center flex-auto py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="hashed_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Set Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SetPasswordFormPage;
