import { cn } from '@/lib/utils';
import { ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export function NavLink({ href, icon: Icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="w-full list-none">
      <Link
        href={href}
        className={cn(
          'flex flex-col items-center justify-center w-full py-2 text-[#9B9B9B] border-l-[5px] border-transparent transition-all duration-300 ease-in-out relative',
          'hover:text-white hover:bg-[#181818] hover:border-l-[#1ed760]',
          isActive && 'text-white bg-[#181818] border-l-[#1ed760]',
        )}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-[11px] font-medium mt-[2px]">{label}</div>
      </Link>
    </li>
  );
}
