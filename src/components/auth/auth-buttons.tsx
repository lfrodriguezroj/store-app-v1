"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { UserNav } from "./user-nav";

export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end gap-4">
      {session && session.user ? (
        <>
          <Button size={"sm"} asChild variant={"secondary"}>
            <Link href="/">Store</Link>
          </Button>
          <Button size={"sm"} asChild variant={"secondary"}>
            <Link href="/">My Products</Link>
          </Button>
          <UserNav user={session.user} />
        </>
      ) : (
        <>
          <Button size={"sm"} asChild variant={"secondary"}>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
