"use server";

import bcrypt from "bcryptjs";
import { LoginSchema, RegisterOrgSchema } from "@/lib/typeSchemas/types";
import * as z from "zod";
import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { findFirstWhere, insertRowIntoTable } from "@/lib/dbActions";
import { redirect } from "next/navigation";
import { createTenantSchema } from "@/_fileSystem/buildSystem";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    const { user } = await getUser();

    if (user) {
      return {
        error: "User is already logged in",
      };
    }

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { user_email, password } = validatedFields.data;

    const result = await findFirstWhere("auth_user", "user_email", user_email);

    const existingUser = result;
    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const passwordsMatch = await bcrypt.compare(
      values.password,
      existingUser.hashed_password
    );

    if (!passwordsMatch)
      return {
        error: "Invalid Password",
      };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: "Logged In Successfully",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  } finally {
    const { user } = await getUser();
    if (user) {
      return redirect("/platform");
    }
  }
};

export const registerTenant = async (
  values: z.infer<typeof RegisterOrgSchema>
) => {
  const validatedFields = RegisterOrgSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {
    tenant_id,
    user_email,
    hashed_password,
    user_first_name,
    user_last_name,
  } = validatedFields.data;
  const crypted_password = await bcrypt.hash(hashed_password, 10);
  const result = await findFirstWhere("auth_user", "user_email", user_email);
  const existingUser = result;
  if (existingUser) {
    return { error: "Email already in use" };
  }

  const response = await insertRowIntoTable("auth_user", {
    tenant_id,
    user_email,
    hashed_password: crypted_password,
    user_first_name,
    user_last_name,
  });
  const userId = response.id;

  const createTenant = await createTenantSchema(tenant_id);
  if (!createTenant) {
    return { error: "Something Went wrong" };
  }

  await insertRowIntoTable(`${tenant_id}.users`, {
    id: userId,
    tenant_id,
    user_email,
    hashed_password: crypted_password,
    user_first_name,
    user_last_name,
  });
  // Remove this later
  const session = await lucia.createSession(response.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Password set successfully!",
  };
};

export const signOUt = async () => {
  try {
    const { session } = await getUser();

    if (!session) {
      return {
        error: "No Session found. User is already logged out",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: "Logged Out Successfully",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  } finally {
    redirect("/login");
  }
};

export const forceSignOut = async (userId: string) => {
  const { user } = await getUser();
  if (!user) {
    return {
      error: "Invalid Session. Refresh the page to try again",
    };
  }
  if (user?.id === userId) {
    return {
      error: "You can't force Logout yourself using this action",
    };
  }
  try {
    await lucia.invalidateUserSessions(userId);

    return {
      success: "Forced Out Successfully",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
