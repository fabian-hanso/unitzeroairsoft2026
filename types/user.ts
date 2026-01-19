export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "member" | "admin";
  created_at: string;
  updated_at: string;
}

export interface UserUpdateData {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  phone?: string;
  avatar_url?: string;
}
