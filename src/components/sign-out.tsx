"use client";
import { Button } from "@/components/ui/button";
// import { createClient } from "@supabase/supabase-js";
import { signOut } from "next-auth/react";

export default function Example() {
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!,
  //   { db: { schema: "next_auth" } }
  // );
  // const { data, error } = await supabase.from("users").select("name");
  return (
    <Button variant={"secondary"} onClick={() => signOut({ callbackUrl: "/" })}>
      Sign out
    </Button>
  );
}
