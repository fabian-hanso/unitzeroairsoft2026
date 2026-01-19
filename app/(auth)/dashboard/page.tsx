export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/app/actions/user";
import DashboardWelcome from "@/components/DashboardWelcome/DashboardWelcome";
// import AuthBreadcrumbs from "@/components/AuthBreadcrumbs/AuthBreadcrumbs";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userData = await getCurrentUser();

  console.log(userData);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        {/* <AuthBreadcrumbs /> */}
        <DashboardWelcome userData={userData} user={user} />
      </main>
    </div>
  );
}
