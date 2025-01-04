import { supabase } from "@/app/utils/supabase/supabaseClient";

export interface UserProfile {
    firstname: string;
    lastname: string;
    role: string;
}

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  return data.user;
}

export async function userProfile() {
  try {
    // Await the user object from getUser()
    const user = await getUserData();
    if (!user) {
      console.error("No user found.");
      return null;
    }

    // Query the profiles table
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}
