import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ComponentType } from 'react';

interface NavLinkProps {
  href: string;
  icon: ComponentType;
  label: string;
  vertical?: boolean;
}

export function NavLink({ href, icon: Icon, label, vertical }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center justify-center transition-all duration-200',
        isActive ? 'text-white' : 'text-white/60',
        vertical
          ? 'flex-col gap-1 px-1 hover:text-white'
          : 'flex-1 flex-col gap-1 px-1 hover:text-white',
      )}
    >
      <div className="h-[22px] w-[22px] flex items-center justify-center">
        <Icon />
      </div>
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  );
}
