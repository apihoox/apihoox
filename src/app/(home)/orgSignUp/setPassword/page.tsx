"use client";

import { useSearchParams } from "next/navigation";
import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
  const params = useSearchParams();
  const tenant_id = params.get("tenant_id");
  const user_email = params.get("user_email");
  const user_first_name = params.get("user_first_name");
  const user_last_name = params.get("user_last_name");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <title>Set Password | APIHooX</title>
      <RegisterForm
        tenant_id={tenant_id}
        user_email={user_email}
        user_first_name={user_first_name}
        user_last_name={user_last_name}
      />
    </main>
  );
};

export default RegisterPage;
