"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  BarChart3, 
  Pin,
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  CheckCircle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Clock,
  Star,
  Activity,
  Sparkles,
  Award
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Posts Generated",
      value: "142",
      change: "+12%",
      changeType: "positive" as const,
      icon: Pin,
      description: "Total posts created",
      color: "bg-blue-500"
    },
    {
      title: "Posts Scheduled",
      value: "28",
      change: "+8%",
      changeType: "positive" as const,
      icon: Calendar,
      description: "Queued for publishing",
      color: "bg-green-500"
    },
    {
      title: "Monthly Views",
      value: "47.2K",
      change: "+15%",
      changeType: "positive" as const,
      icon: Eye,
      description: "Pinterest impressions",
      color: "bg-purple-500"
    },
    {
      title: "Engagement Rate",
      value: "8.4%",
      change: "+22%",
      changeType: "positive" as const,
      icon: Target,
      description: "Average engagement",
      color: "bg-orange-500"
    },
    {
      title: "Total Saves",
      value: "3.8K",
      change: "+18%",
      changeType: "positive" as const,
      icon: Heart,
      description: "Posts saved by users",
      color: "bg-red-500"
    },
    {
      title: "Click-through Rate",
      value: "3.2%",
      change: "-2%",
      changeType: "negative" as const,
      icon: TrendingUp,
      description: "Traffic to website",
      color: "bg-indigo-500"
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "generated",
      title: "Generated 5 new posts from blog article",
      subtitle: "Marketing Tips Blog",
      time: "2 hours ago",
      icon: Zap,
      color: "bg-blue-100 text-blue-600",
      status: "completed"
    },
    {
      id: 2,
      type: "scheduled",
      title: "Scheduled 3 posts for tomorrow",
      subtitle: "Auto-scheduled for optimal times",
      time: "4 hours ago",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
      status: "completed"
    },
    {
      id: 3,
      type: "published",
      title: "Published '10 Tips for Better Pinterest Posts'",
      subtitle: "1.2K views • 45 saves",
      time: "6 hours ago",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
      status: "published"
    },
    {
      id: 4,
      type: "performance",
      title: "Post performance spike detected",
      subtitle: "Engagement up 150% this week",
      time: "8 hours ago",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
      status: "trending"
    },
    {
      id: 5,
      type: "milestone",
      title: "Reached 10K total views milestone!",
      subtitle: "Congratulations on the achievement",
      time: "1 day ago",
      icon: Award,
      color: "bg-yellow-100 text-yellow-600",
      status: "milestone"
    },
  ];

  const topPerformers = [
    {
      id: 1,
      title: "10 Pinterest Marketing Tips That Actually Work",
      views: "12.4K",
      saves: "847",
      engagement: "8.2%",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Ultimate Guide to Pinterest SEO",
      views: "9.8K",
      saves: "623",
      engagement: "6.9%",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Design Trends for 2024",
      views: "7.2K",
      saves: "489",
      engagement: "7.1%",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=400&fit=crop"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-30"></div>
        <div className="relative max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Your Pinterest empire is growing! Here&apos;s what&apos;s happening today.
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-center">
                <div className="text-2xl font-bold">142</div>
                <div className="text-sm text-white/70">Posts</div>
                </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">47.2K</div>
                <div className="text-sm text-white/70">Views</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-primary hover:bg-white/90 shadow-lg">
              <Link href="/dashboard/generate">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate New Posts
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg border-0">
              <Link href="/dashboard/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === "positive";
          return (
            <div key={stat.title} className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className={`h-10 w-10 ${stat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-gray-600 mb-2 leading-tight">{stat.title}</div>
                <div className="flex items-center">
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern SaaS Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Activity - Full Width on Mobile, 2/3 on Desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                    Recent Activity
                </h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                    <div key={activity.id} className="flex items-start space-x-3 group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 ${activity.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                          <Icon className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.subtitle}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        {activity.status === 'milestone' && <Star className="h-3 w-3 text-yellow-500" />}
                        {activity.status === 'trending' && <TrendingUp className="h-3 w-3 text-orange-500" />}
                        {activity.status === 'completed' && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500/5 to-blue-600/10">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Performance
              </h2>
                  </div>
            <div className="p-6 space-y-5">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">8.4%</div>
                <div className="text-sm text-gray-600 mb-3">Engagement Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                <div className="flex items-center justify-center mt-2">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">Above average</span>
                    </div>
                  </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">3.2%</div>
                  <div className="text-xs text-gray-600">CTR</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">12.1%</div>
                  <div className="text-xs text-gray-600">Save Rate</div>
                </div>
              </div>
            </div>
              </div>
              </div>

        {/* Top Performers - Full Width */}
        <div className="lg:col-span-2 xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500/5 to-purple-600/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-purple-600" />
                  Top Performers
                </h2>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                  View All
                </Button>
              </div>
        </div>
            <div className="p-6 space-y-4">
              {topPerformers.map((post, index) => (
                <div key={post.id} className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
      </div>
                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.saves}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-xs font-medium text-purple-600">{post.engagement}</div>
                  </div>
                </div>
              ))}
            </div>
              </div>
            </div>
      </div>

      {/* Enhanced Recent Posts Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Pin className="h-5 w-5 mr-2 text-primary" />
                Recent Posts
            </h2>
            <Button variant="outline" size="sm" asChild className="hover:bg-primary hover:text-white transition-colors">
              <Link href="/dashboard/posts">
                View All Posts
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
              </Button>
            </div>
          </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPerformers.map((post, index) => (
              <div key={post.id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Award className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs font-medium text-gray-900">#{index + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                        {post.views}
                    </span>
                      <span className="flex items-center text-gray-500">
                      <Heart className="h-4 w-4 mr-1" />
                        {post.saves}
                    </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Target className="h-3 w-3 mr-1" />
                      {post.engagement}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Performance</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs font-medium text-green-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}