import { createClient } from "@supabase/supabase-js";

export default async function Example() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: {schema: "next_auth"} }
  );
  const { data, error } = await supabase.from("users").select("name");
  return <pre>{JSON.stringify(data[0].name)}</pre>
}
