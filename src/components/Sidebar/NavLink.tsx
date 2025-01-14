import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
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
        'flex items-center justify-center transition-colors hover:text-spotify-green',
        isActive ? 'text-spotify-green' : 'text-gray-400',
        vertical
          ? 'flex-col gap-1 px-2 py-3'
          : 'flex-1 flex-col gap-1 px-1 py-2',
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
