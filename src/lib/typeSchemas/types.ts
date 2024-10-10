import { z } from "zod";

export const RegisterOrgSchema = z
  .object({
    tenant_id: z.string(),
    user_email: z.string(),
    user_first_name: z.string(),
    user_last_name: z.string(),
    hashed_password: z.string().min(6, {
      message: "Password should be a minimum of 6 characters",
    }),
    confirm_password: z.string().min(6, {
      message: "Password should be a minimum of 6 characters",
    }),
  })
  .refine((data) => data.hashed_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const LoginSchema = z.object({
  user_email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const tenantSchema = z.object({
  tenant_name: z.string().min(3, {
    message: "Org Name is required",
  }),
  owner_first_name: z.string().min(3, {
    message: "First Name is required",
  }),
  owner_last_name: z.string().min(3, {
    message: "Last Name is required",
  }),
  owner_email: z.string().min(3, {
    message: "Email is required",
  }),
  owner_phone: z.string().min(10, {
    message: "Phone is required",
  }),
});

export const tenantUserSchema = z.object({
  user_email: z.string(),
  user_first_name: z.string(),
  user_last_name: z.string(),
});

export const tenantUserRegisterSchema = z
  .object({
    tenant_id: z.string(),
    user_email: z.string().min(1, {
      message: "Required",
    }),
    user_first_name: z.string().min(1, {
      message: "Required",
    }),
    user_last_name: z.string().min(1, {
      message: "Required",
    }),
    hashed_password: z.string().min(6, {
      message: "Password should be a minimum of 6 characters",
    }),
    confirm_password: z.string().min(6, {
      message: "Password should be a minimum of 6 characters",
    }),
  })
  .refine((data) => data.hashed_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const groupRegisterSchema = z.object({
  group_name: z.string().min(1, { message: "Required" }),
  group_description: z.string().optional(),
});
export const roleRegisterSchema = z.object({
  role_name: z.string().min(1, { message: "Required" }),
  role_description: z.string().optional(),
});
