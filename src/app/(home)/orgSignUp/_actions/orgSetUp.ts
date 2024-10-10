import { insertRowIntoTable } from "@/lib/dbActions";
import { tenantSchema } from "@/lib/typeSchemas/types";
import { z } from "zod";

export const orgSetUp = async (values: z.infer<typeof tenantSchema>) => {
  const validatedFields = tenantSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {
    tenant_name,
    owner_first_name,
    owner_last_name,
    owner_email,
    owner_phone,
  } = validatedFields.data;

  const response = await insertRowIntoTable("tenants", {
    tenant_name,
    owner_first_name,
    owner_last_name,
    owner_email,
    owner_phone,
  });

  return {
    success: "Organisation Created",
    response,
  };
};
