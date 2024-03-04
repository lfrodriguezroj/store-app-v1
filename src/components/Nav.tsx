"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end gap-4">
      {session && session.user ? (
        <>
          <div className="w-full">
            <div className="absolute top-0 left-0 p-5">
              <Button size={"sm"} asChild variant={"secondary"}>
                <Link href="/store">Store</Link>
              </Button>
              <Button size={"sm"} asChild variant={"secondary"}>
                <Link href="/user/products">My Products</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nav;
