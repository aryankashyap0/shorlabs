"use client";

import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-gray-100">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Links Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
                    <a
                        href="https://github.com/aryankashyap0/shorlabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 transition-colors"
                    >
                        GitHub
                    </a>
                    <Link
                        href="/terms-of-service"
                        className="hover:text-gray-900 transition-colors"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy-policy"
                        className="hover:text-gray-900 transition-colors"
                    >
                        Privacy
                    </Link>
                    <a
                        href="mailto:kashyaparyan093@gmail.com"
                        className="hover:text-gray-900 transition-colors"
                    >
                        Contact
                    </a>
                </div>

                {/* Logo & Copyright */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                            shorlabs
                        </span>
                    </div>
                    <p className="text-xs text-gray-400">
                        © {currentYear} Shorlabs
                    </p>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
