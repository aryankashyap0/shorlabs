import { LoginForm } from "@/components/login-form";

export default function SignInPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="/" className="flex items-center gap-2 self-center font-medium">
                    <span className="text-lg font-semibold tracking-tight">
                        shorlabs
                    </span>
                </a>
                <LoginForm />
            </div>
        </div>
    );
}
