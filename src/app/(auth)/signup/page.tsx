"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/redux.hooks";
import { signupThunk } from "@/redux/thunk/auth.thunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useTheme } from "next-themes";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .nonempty("Password is required."),
});

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme } = useTheme();
  const [isSubmited, setIsSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      setIsSubmited(true);
      await dispatch(signupThunk(data)).unwrap();
      router.push("/dashboard");
      toast.success("Account created successfully!");
    } catch (error: any) {
      setIsSubmited(false);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 border">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmited}>
                {isSubmited ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="text-center text-gray-400 my-4">Or continue with</div>

          {/* GitHub Signup Button */}
          <Button variant="outline" className="w-full flex gap-2">
            <Github className="h-5 w-5" /> Sign Up with GitHub
          </Button>

          {/* Signup Link */}
          <div className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
