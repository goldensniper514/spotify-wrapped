"use client";

import { cn } from "@/lib/utils";
import { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  icon: ComponentType;
  label: string;
}

export function NavLink({ href, icon: Icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center py-4 transition-colors sm:w-full",
        // Base styles
        "border-t-[3px] border-transparent sm:border-t-0 sm:border-l-[5px]",
        isActive
          ? "text-white  bg-spotify-black"
          : "text-white/60 hover:text-white hover:bg-spotify-black",
        // Mobile: top border, Desktop: left border
        isActive &&
          "border-t-[#1ed760] sm:border-t-transparent sm:border-l-[#1ed760]",
        // Hover effects
        "hover:border-t-[#1ed760] sm:hover:border-t-transparent sm:hover:border-l-[#1ed760]"
      )}
    >
      <div className="h-6 w-6">
        <Icon />
      </div>
      <span className="mt-1 text-xs">{label}</span>
    </Link>
  );
}
