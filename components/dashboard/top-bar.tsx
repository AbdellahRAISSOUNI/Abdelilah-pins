"use client";

import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  Menu,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, analytics..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:block">{user?.name}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
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
        </div>
      </div>
    </header>
  );
}
