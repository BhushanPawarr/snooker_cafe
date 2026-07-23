"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function login(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid username or password.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    throw error;
  }
}
