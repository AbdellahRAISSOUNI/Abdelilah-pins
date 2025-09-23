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
  X,
  Crown,
  TrendingUp,
  Sparkles
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
              <span className="text-xl font-bold text-gray-900">PinSlayer</span>
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

          {/* Modern Upgrade Plan Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
              {/* Plan Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free Plan</p>
                    <p className="text-xs text-gray-600">Monthly credits</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-primary/10 rounded-full px-2 py-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Upgrade</span>
                </div>
              </div>

              {/* Credit Usage */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-600">Credits used</span>
                  <span className="font-medium text-gray-900">1,247 / 2,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300" 
                    style={{ width: '62.35%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">62% used</span>
                  <span className="text-xs text-green-600 font-medium">753 remaining</span>
                </div>
              </div>

              {/* Upgrade Button */}
              <Button size="sm" className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-sm">
                <TrendingUp className="h-3 w-3 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
