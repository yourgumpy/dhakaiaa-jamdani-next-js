import { supabase } from "@/app/utils/supabase/supabaseClient";

interface orders {
    id: number;
    date: string;
    status:  "confirmed"| "processing" | "shipped" | "cancelled" |"delivered" | "returned" | "refunded";
    total: number;
    products: JSON[];
}