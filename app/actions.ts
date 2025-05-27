"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  // Optional: Tambahkan validasi email untuk membatasi login
  // const allowedEmail = "your-email@example.com";
  // if (email !== allowedEmail) {
  //   return encodedRedirect("error", "/sign-in", "Unauthorized access");
  // }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", "Invalid credentials");
  }

  return redirect("/protected");
};

// Remove forgotPasswordAction since we don't need it anymore

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();
  
  // Verify user is authenticated first
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be logged in to reset your password"
    );
  }

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/profile/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/profile/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/protected/profile/reset-password",
      "Password update failed"
    );
  }

  return redirect("/protected/profile?success=Password+updated");
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
