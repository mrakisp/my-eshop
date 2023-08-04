import { cookies } from "next/headers";

export const isAdminTokenValid = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("logged_in");

  if (token?.value === process.env.ADMIN_TOKEN) {
    return true;
  } else {
    return false;
  }
};
