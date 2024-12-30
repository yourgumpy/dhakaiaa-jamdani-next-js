import { supabase } from "@/app/utils/supabase/supabaseClient";

export async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }
    return data.user;
}

export async function userSignOut() {
  const { error } = await supabase.auth.signOut();
  if(error) console.log('Error logging out:', error.message);
}