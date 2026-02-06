import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="w-full max-w-sm sm:max-w-md">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "w-full bg-white border border-gray-200 shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6",
                            formButtonPrimary: "w-full bg-gray-900 text-white hover:bg-gray-800 rounded-full h-10 sm:h-11 text-sm sm:text-base",
                            headerTitle: "text-gray-900 text-xl sm:text-2xl font-semibold",
                            headerSubtitle: "text-gray-500 text-sm sm:text-base",
                            socialButtonsBlockButton: "w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-10 sm:h-11 text-sm sm:text-base",
                            socialButtonsBlockButtonText: "text-sm sm:text-base",
                            formFieldLabel: "text-gray-700 text-sm",
                            formFieldInput: "w-full bg-white border-gray-200 text-gray-900 rounded-lg h-10 sm:h-11 text-sm sm:text-base",
                            footerActionLink: "text-gray-900 hover:text-gray-700 text-sm",
                            footerActionText: "text-gray-500 text-sm",
                            identityPreviewText: "text-gray-900 text-sm",
                            identityPreviewEditButton: "text-gray-600 text-sm",
                            dividerLine: "bg-gray-200",
                            dividerText: "text-gray-400 text-xs sm:text-sm",
                        },
                    }}
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/create-account"
                    afterSignInUrl="/projects"
                />
            </div>
        </div>
    );
}
