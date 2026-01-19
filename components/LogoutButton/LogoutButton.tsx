"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      className="block px-4 w-full py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:bg-red-800 hover:text-white text-left cursor-pointer"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Wird abgemeldet..." : "Abmelden"}
    </button>
  );
}
