"use client";
import Link from "next/link";
import { SignedIn,SignedOut,UserButton,useUser,useOrganization,} from "@clerk/nextjs";
import {Menu,Home,FileText,Users,Brain,LogIn,UserPlus,Building,} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    ];

    if (organization) {
      return [
        ...baseItems,
        {
          href: `/${organization.slug}`,
          label: "Organization Dashboard",
          icon: <Building className="h-4 w-4" />,
        },
        {
          href: `/${organization.slug}/documents`,
          label: "Org Documents",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          href: "/select-org",
          label: "Switch Organization",
          icon: <Users className="h-4 w-4" />,
        },
      ];
    }
    // If user is new
    return [
      ...baseItems,
      {
        href: "/select-org",
        label: "Switch Organization",
        icon: <Users className="h-4 w-4" />,
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-blue-600" />
          DocDocGo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.label === "Organization Dashboard"
                ? pathname === item.href
                : item.label === "Org Documents"
                ? pathname.startsWith(item.href)
                : pathname === item.href;
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

        {/* auth section */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {organization
                  ? `In: ${organization.name}`    //if in
                  : user?.firstName || user?.username}
              </span>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
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
          </SignedOut>

          {/* mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {/* mobile Navigation */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2"
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </Link>
                  ))}

                  {/* mobile Auth */}
                  <div className="border-t pt-4 mt-4">
                    <SignedIn>
                      <div className="flex flex-col gap-2">
                        <div className="px-2 text-sm text-gray-600 mb-2">
                          {organization
                            ? `In: ${organization.name}`
                            : `Signed in as ${user?.firstName || user?.username}`}
                        </div>
                        <div className="flex justify-center">
                          <UserButton afterSignOutUrl="/" />
                        </div>
                      </div>
                    </SignedIn>

                    <SignedOut>
                      <div className="flex flex-col gap-2">
                        <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </SignedOut>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
