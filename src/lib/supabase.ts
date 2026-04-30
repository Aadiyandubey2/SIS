import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gmnsofvrcxivtehtfnoi.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_XS8gKFvllBuP-iAV47AgVA_Wzlx0n1U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
