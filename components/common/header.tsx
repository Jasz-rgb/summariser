"use client";
import Link from "next/link";
import {Show,UserButton,useUser,useOrganization,} from "@clerk/nextjs";
import {Menu,Home,FileText,Users,Brain,LogIn,UserPlus,Building,} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Header() {
  const pathname=usePathname();
  const getNavItems = () => {
    const baseItems = [
      {
        href: "/",
        label: "Home",
        icon: <Home className="w-4 h-4" />,
      },
      {
        href: "/select-org",
        label: "Switch Organization",
        icon: <Users className="w-4 h-4" />,
      },
    ];
    return [...baseItems];
  };
  const navItems=getNavItems();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-blue-600" />
          DocuAI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        {/* <Auth Section> */}
        <Show when="signed-out">
            <div className="hidden md:flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </Show>
      </div>
    </header>
  );
}