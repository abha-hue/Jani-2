import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchReports = async () => {
    const { data, error } = await supabase
        .from("Jani")
        .select("*");

    if (error) throw new Error(error.message);
    return data;
};
