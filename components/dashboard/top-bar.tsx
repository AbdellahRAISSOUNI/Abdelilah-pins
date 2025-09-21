"use client";

import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  Menu,
  User,
  LogOut,
  Settings,
  CheckCircle,
  AlertCircle,
  Zap,
  Star,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, useRef } from "react";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Posts generated successfully",
      message: "5 new Pinterest posts created from your blog",
      time: "2 minutes ago",
      icon: CheckCircle,
      unread: true
    },
    {
      id: 2,
      type: "warning",
      title: "Low credit warning",
      message: "You have 753 credits remaining",
      time: "1 hour ago",
      icon: AlertCircle,
      unread: true
    },
    {
      id: 3,
      type: "info",
      title: "Post performance spike",
      message: "Your post got 1.2K views today",
      time: "3 hours ago",
      icon: Zap,
      unread: false
    },
    {
      id: 4,
      type: "milestone",
      title: "Achievement unlocked",
      message: "Reached 10K total views!",
      time: "1 day ago",
      icon: Star,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

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
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-lg z-50">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowNotifications(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    const iconColor = {
                      success: "text-green-500",
                      warning: "text-orange-500", 
                      info: "text-blue-500",
                      milestone: "text-purple-500"
                    }[notification.type];

                    return (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            notification.unread ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`h-4 w-4 ${iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="flex-shrink-0">
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

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
