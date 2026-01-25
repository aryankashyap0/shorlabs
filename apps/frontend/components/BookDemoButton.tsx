"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookDemoButtonProps {
    className?: string;
    size?: "default" | "sm" | "lg" | "icon";
    children?: React.ReactNode;
}

const BookDemoButton = ({
    className,
    size = "default",
    children = "Contact"
}: BookDemoButtonProps) => {
    return (
        <Button
            className={cn(
                "bg-black hover:bg-neutral-800 text-white border border-black font-bold",
                className
            )}
            size={size}
            asChild
        >
            <a href="mailto:kashyaparyan093@gmail.com" className="no-underline">
                {children}
            </a>
        </Button>
    );
};

export { BookDemoButton };
