"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Pin, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Pin className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">PinGenerator</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  <User className="h-4 w-4" />
                </div>
                <span>{user.name}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-gray-900">
                      Welcome, {user.name}!
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
