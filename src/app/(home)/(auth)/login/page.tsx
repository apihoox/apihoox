import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./_components/loginForm";

const LoginPage = async () => {
  const { user } = await getUser();

  if (user) {
    return redirect("/platform");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <title>Login | APIHooX</title>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
