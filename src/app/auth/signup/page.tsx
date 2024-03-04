import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { SignUpForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign up for My SaaS - Start Now",
  description:
    "Sign up today at My SaaS to access a personalized [type of service or product] experience. Enjoy exclusive features like [feature 1], [feature 2], and [feature 3]. Join our community and start taking advantage of all the benefits of membership from day one - creating your account is fast, easy and secure!",
};

export default function signUpPage() {
  return (
    <>
      <div className="lg:h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-0">
        <div className="w-full min-h-screen p-10 grid place-content-center relative">
          <div className="absolute top-0 left-0 p-5 text-3xl font-medium mb-16">
            <Link href="/" className="inline-flex">
              Store App
            </Link>
          </div>
          <div className="absolute right-0 top-0 p-4">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
          <div className="w-full max-w-[375px]">
            <div className="flex flex-col text-center my-6 space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the info below to create your account
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}
