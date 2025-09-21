"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Zap, 
  Pin, 
  Calendar, 
  BarChart3, 
  Settings,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Generate Posts", href: "/dashboard/generate", icon: Zap },
  { name: "My Posts", href: "/dashboard/posts", icon: Pin },
  { name: "Scheduled Posts", href: "/dashboard/scheduled", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <Pin className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">PinGenerator</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Upgrade Plan</p>
                  <p className="text-xs text-gray-600">Get more features</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
