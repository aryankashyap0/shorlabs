"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, isLoaded } = useSignIn();

  const handleGoogleSignIn = async () => {
    if (!isLoaded || !signIn) return;

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/projects",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to Shorlabs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={!isLoaded}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/create-account" className="underline underline-offset-4 hover:text-primary">
                Create account
              </Link>
            </FieldDescription>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
