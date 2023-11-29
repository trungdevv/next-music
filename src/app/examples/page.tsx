import { createClient } from "@supabase/supabase-js";

export default async function Example() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: {schema: "next-auth"} }
  );
  const { data, error } = await supabase.from("user").select()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
