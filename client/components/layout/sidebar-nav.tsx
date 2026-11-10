"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Archive,
  FolderOpen,
  Images,
  LogOut,
  Trash2,
} from "lucide-react";
import { useLogout } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { StorageWidget } from "@/components/library/storage-widget";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/api";

const navItems = [
  { href: "/photos", label: "Photos", icon: Images },
  { href: "/albums", label: "Albums", icon: FolderOpen },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/trash", label: "Trash", icon: Trash2 },
];

type SidebarNavProps = {
  user?: User | null;
  onNavigate?: () => void;
};

export function SidebarNav({ user, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-5 py-5">
        <div className="flex items-center gap-3">
          
            <Image
            src="/logo.svg"
            alt="Google Photos"
            width={32}
            height={32}
            className="size-8 shrink-0 object-contain"
            priority 
             />
          
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              Google Photos
            </p>
            <p className="text-xs text-muted-foreground">Clone</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-sidebar-border px-3 py-4">
        <StorageWidget />

        {user && (
          <div className="rounded-xl bg-sidebar-accent/40 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Account
            </p>
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {user.displayName || "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl px-2 py-1.5">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>

        <Button
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full justify-start gap-3 rounded-xl px-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          {logoutMutation.isPending ? (
            <Spinner className="size-4" />
          ) : (
            <LogOut className="size-4" />
          )}
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}