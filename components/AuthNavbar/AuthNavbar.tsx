import { getCurrentUser } from "@/app/actions/user";
import NavbarView from "./NavbarView.tsx/NavbarView";

export default async function AuthNavbar() {
  const userData = await getCurrentUser();

  return <NavbarView userData={userData} />;
}
