"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { createClient } from "@supabase/supabase-js";
import { signOut, useSession } from "next-auth/react";

export default function Example() {
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!,
  //   { db: { schema: "next_auth" } }
  // );
  // const { data, error } = await supabase.from("users").select("name");
  const { data: session, status } = useSession();
  return (
    <div className="absolute right-4 flex items-center">
      <Avatar>
        {/* <p>hi, {session?.user?.name}</p> */}
        <AvatarImage src={session?.user?.image ?? ""} />
        <AvatarFallback>hi</AvatarFallback>
      </Avatar>
      <Button
      variant={'secondary'}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </div>
  );
}
