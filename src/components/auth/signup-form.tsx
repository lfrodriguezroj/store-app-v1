"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";

import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .regex(new RegExp("^[a-zA-Z0-9]+$"), "No special characters allowed!"),
		lastName: z
      .string({
        required_error: "Last name is required",
      })
      .regex(new RegExp("^[a-zA-Z0-9]+$"), "No special characters allowed!"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must have at least 6 characters")
      .max(20, "Password must be up to 20 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm your password is required" })
      .min(6, "Password must have at least 6 characters")
      .max(20, "Password must be up to 20 characters"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and Confirm Password doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

export function SignUpForm() {
  const [passStrength, setPassStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

	const router = useRouter();

  const form = useForm<InputType>({
    // validate inputs
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: InputType) {
    try {
      setIsLoading(true);
      const { confirmPassword, ...user } = values;

      const res = await axios.post("http://localhost:4000" + "/auth/signup", {
        email: user.email,
        password: user.password,
      });

      if (!res) {
        toast({
          title: "Something went wrong!",
          variant: "default",
        });
      } else {
				toast({
					title: "Account Created!",
          description:
					"Your account has been created successfully! You can now login.",
        });
				form.reset();
				router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong!",
        description: "We couldn't create your account. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) }>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Icons.user
                      className={`${
                        form.formState.errors.firstName
                          ? "text-destructive"
                          : "text-muted-foreground"
                      } `}
                    />
                    <Input
                      placeholder="Your First Name"
                      className={`${
                        form.formState.errors.firstName &&
                        "border-destructive bg-destructive/30"
                      }`}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Icons.user
                      className={`${
                        form.formState.errors.lastName
                          ? "text-destructive"
                          : "text-muted-foreground"
                      } `}
                    />
                    <Input
                      placeholder="Your Last Name"
                      className={`${
                        form.formState.errors.lastName &&
                        "border-destructive bg-destructive/30"
                      }`}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.email
                        className={`${
                          form.formState.errors.email
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className={`${
                          form.formState.errors.email &&
                          "border-destructive bg-destructive/30"
                        }`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.key
                        className={`${
                          form.formState.errors.password
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        type="password"
                        placeholder="Your Password"
                        className={`${
                          form.formState.errors.password &&
                          "border-destructive bg-destructive/30"
                        }`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.key
                        className={`${
                          form.formState.errors.confirmPassword
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        type="password"
                        placeholder="Confirm your Password"
                        className={`${
                          form.formState.errors.confirmPassword &&
                          "border-destructive bg-destructive/30"
                        }`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-4" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
