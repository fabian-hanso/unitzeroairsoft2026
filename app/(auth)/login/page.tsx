export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/user";

import LoginComponent from "@/components/Login/Login";

export default async function Login() {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const user = await getCurrentUser();

  if (authUser && user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-white">
      <LoginComponent />
    </div>
  );
}
