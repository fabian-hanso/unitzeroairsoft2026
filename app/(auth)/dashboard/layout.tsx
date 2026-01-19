export const dynamic = "force-dynamic";

import AuthNavbar from "@/components/AuthNavbar/AuthNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavbar />
      {children}
    </>
  );
}
