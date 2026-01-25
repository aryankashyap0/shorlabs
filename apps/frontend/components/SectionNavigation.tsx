"use client";

import { BookDemoButton } from "@/components/BookDemoButton";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SectionNavigation() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[#faf9f7]/95 backdrop-blur-sm border-b border-neutral-200"
                : "bg-transparent"
                }`}
        >
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2"
                    >
                        <span className="font-mono text-base sm:text-lg font-semibold tracking-tight text-neutral-900 uppercase">
                            Shorlabs
                        </span>
                        <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    
                        <div className="h-4 w-px bg-neutral-300" />
                        <a
                            href="https://github.com/aryankashyap0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 hover:text-neutral-900 transition-colors p-2"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                        <BookDemoButton
                            className="font-mono text-xs sm:text-sm uppercase tracking-wide border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-none transition-all duration-200"
                        >
                            Contact
                        </BookDemoButton>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-neutral-900 hover:bg-neutral-100 rounded-none border border-transparent hover:border-neutral-200"
                            aria-label="Toggle Menu"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="sr-only">Menu</span>
                            {!open ? (
                                <Menu className="h-4 w-4" strokeWidth={1.5} />
                            ) : (
                                <X className="h-4 w-4" strokeWidth={1.5} />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute inset-x-0 top-14 sm:top-16 bg-[#faf9f7] border-b border-neutral-200 transition-all duration-300 ease-out overflow-hidden ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col px-4 py-6 space-y-1">
                   
                    <div className="pt-4 flex flex-col gap-3">
                        <a
                            href="https://github.com/aryankashyap0"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wide text-neutral-600 hover:text-neutral-900 py-3 border border-neutral-300 transition-colors"
                        >
                            <Github className="w-4 h-4" strokeWidth={1.5} />
                            GitHub
                        </a>
                        <BookDemoButton
                            className="w-full font-mono text-sm uppercase tracking-wide border border-neutral-900 bg-neutral-900 text-white hover:bg-transparent hover:text-neutral-900 px-4 py-3 rounded-none transition-all duration-200"
                        >
                            Contact Us
                        </BookDemoButton>
                    </div>
                </nav>
            </div>
        </header>
    );
}
