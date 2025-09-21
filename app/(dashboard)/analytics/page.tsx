"use client";

import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target
} from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    { title: "Total Views", value: "24.5K", change: "+22%", icon: Eye },
    { title: "Total Saves", value: "3.2K", change: "+15%", icon: Heart },
    { title: "Total Shares", value: "892", change: "+8%", icon: Share2 },
    { title: "Engagement Rate", value: "4.2%", change: "+12%", icon: TrendingUp },
  ];

  const topPosts = [
    { title: "Creating Viral Pinterest Content", views: 3400, saves: 156, shares: 45 },
    { title: "Pinterest SEO Best Practices", views: 2100, saves: 78, shares: 23 },
    { title: "10 Tips for Better Pinterest Posts", views: 1240, saves: 45, shares: 12 },
    { title: "Pinterest Marketing Strategy Guide", views: 890, saves: 32, shares: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            Track your Pinterest performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{metric.change} from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-gray-600">Performance chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Posts</h2>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {post.saves}
                    </span>
                    <span className="flex items-center">
                      <Share2 className="h-3 w-3 mr-1" />
                      {post.shares}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Engagement Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Audience Demographics</h3>
            <p className="text-sm text-gray-600">Age, location, and interest analysis</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Engagement Patterns</h3>
            <p className="text-sm text-gray-600">Peak activity times and trends</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Content Performance</h3>
            <p className="text-sm text-gray-600">Best performing content types</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Advanced Analytics Coming Soon</h3>
            <p className="text-sm text-gray-600">
              We&apos;re working on comprehensive analytics including detailed performance metrics, 
              audience insights, and competitive analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
