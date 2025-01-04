import { supabase } from "@/app/utils/supabase/supabaseClient";

export const getAllProducts = async () => {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
  }

  return products;
};
