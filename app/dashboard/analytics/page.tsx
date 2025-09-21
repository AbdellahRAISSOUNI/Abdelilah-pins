"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import {
  Heart,
  Download,
  Calendar,
  Target,
  Zap,
  Award,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileText,
  Mail,
  Settings,
  Hash,
  Globe,
  AlertCircle
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  description: string;
}

interface PostPerformance {
  id: number;
  title: string;
  image: string;
  category: string;
  engagement: number;
  reach: number;
  saves: number;
  clicks: number;
  date: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface InsightCard {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'recommendation';
  icon: React.ReactNode;
  action?: string;
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  // const [selectedMetric, setSelectedMetric] = useState<string>('engagement');

  // Key Metrics Data
  const metrics: MetricCard[] = [
    {
      title: "Total Posts Generated",
      value: "2,847",
      change: 12.5,
      changeType: 'increase',
      icon: <FileText className="h-5 w-5" />,
      description: "All time posts created"
    },
    {
      title: "Posts This Month",
      value: "156",
      change: 8.2,
      changeType: 'increase',
      icon: <Calendar className="h-5 w-5" />,
      description: "Posts scheduled this month"
    },
    {
      title: "Avg Engagement Rate",
      value: "8.4%",
      change: -2.1,
      changeType: 'decrease',
      icon: <Heart className="h-5 w-5" />,
      description: "Average engagement across all posts"
    },
    {
      title: "Click-Through Rate",
      value: "3.2%",
      change: 15.7,
      changeType: 'increase',
      icon: <Target className="h-5 w-5" />,
      description: "Average CTR to your website"
    },
    {
      title: "Pinterest Reach",
      value: "45.2K",
      change: 22.3,
      changeType: 'increase',
      icon: <Globe className="h-5 w-5" />,
      description: "Total unique accounts reached"
    },
    {
      title: "Top Performing Post",
      value: "2.4K",
      change: 45.8,
      changeType: 'increase',
      icon: <Award className="h-5 w-5" />,
      description: "Best post saves this month"
    }
  ];

  // Engagement over time data
  const engagementData = useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      return {
        date: date.toISOString().split('T')[0],
        engagement: Math.floor(Math.random() * 15) + 5,
        reach: Math.floor(Math.random() * 2000) + 800,
        saves: Math.floor(Math.random() * 150) + 50,
        clicks: Math.floor(Math.random() * 80) + 20
      };
    });
  }, [dateRange]);

  // Category performance data
  const categoryData = [
    { name: 'Marketing', posts: 45, engagement: 9.2, reach: 12500, color: '#ef4444' },
    { name: 'SEO', posts: 38, engagement: 8.7, reach: 11200, color: '#f97316' },
    { name: 'Design', posts: 52, engagement: 7.8, reach: 9800, color: '#eab308' },
    { name: 'Content', posts: 41, engagement: 8.9, reach: 10600, color: '#22c55e' },
    { name: 'Analytics', posts: 29, engagement: 9.5, reach: 8900, color: '#06b6d4' },
    { name: 'Community', posts: 33, engagement: 8.1, reach: 7500, color: '#8b5cf6' }
  ];

  // Best posting times heatmap data
  const postingTimesData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return hours.map(hour => {
      const data: Record<string, string | number> = { hour: `${hour}:00` };
      days.forEach(day => {
        // Simulate higher engagement during business hours and evenings
        let engagement = Math.random() * 100;
        if (hour >= 9 && hour <= 17) engagement *= 1.3; // Business hours
        if (hour >= 18 && hour <= 22) engagement *= 1.2; // Evening
        if (hour >= 0 && hour <= 6) engagement *= 0.3; // Night
        
        (data as Record<string, number>)[day] = Math.floor(engagement);
      });
      return data;
    });
  }, []);

  // Content type performance
  const contentTypeData = [
    { name: 'Infographics', value: 35, color: '#ef4444' },
    { name: 'Tutorials', value: 28, color: '#f97316' },
    { name: 'Tips & Tricks', value: 22, color: '#eab308' },
    { name: 'Behind Scenes', value: 15, color: '#22c55e' }
  ];

  // Top performing posts
  const topPosts: PostPerformance[] = [
    {
      id: 1,
      title: "Ultimate Pinterest Marketing Guide for 2024",
      image: "https://picsum.photos/400/600?random=101",
      category: "Marketing",
      engagement: 12.4,
      reach: 15420,
      saves: 892,
      clicks: 234,
      date: "2024-01-15",
      performance: 'excellent'
    },
    {
      id: 2,
      title: "SEO Best Practices That Actually Work",
      image: "https://picsum.photos/400/600?random=102",
      category: "SEO",
      engagement: 11.8,
      reach: 13200,
      saves: 756,
      clicks: 198,
      date: "2024-01-12",
      performance: 'excellent'
    },
    {
      id: 3,
      title: "Design Trends That Will Dominate 2024",
      image: "https://picsum.photos/400/600?random=103",
      category: "Design",
      engagement: 9.7,
      reach: 11800,
      saves: 634,
      clicks: 167,
      date: "2024-01-10",
      performance: 'good'
    },
    {
      id: 4,
      title: "Content Strategy Blueprint for Success",
      image: "https://picsum.photos/400/600?random=104",
      category: "Content",
      engagement: 8.9,
      reach: 9800,
      saves: 523,
      clicks: 145,
      date: "2024-01-08",
      performance: 'good'
    },
    {
      id: 5,
      title: "Analytics Dashboard Setup Guide",
      image: "https://picsum.photos/400/600?random=105",
      category: "Analytics",
      engagement: 7.2,
      reach: 8700,
      saves: 412,
      clicks: 123,
      date: "2024-01-05",
      performance: 'average'
    },
    {
      id: 6,
      title: "Community Building Strategies",
      image: "https://picsum.photos/400/600?random=106",
      category: "Community",
      engagement: 6.8,
      reach: 7200,
      saves: 389,
      clicks: 98,
      date: "2024-01-03",
      performance: 'average'
    }
  ];

  // AI Insights
  const insights: InsightCard[] = [
    {
      title: "Peak Engagement Time",
      description: "Your posts perform 23% better when posted at 3:00 PM EST on weekdays",
      type: 'success',
      icon: <Clock className="h-5 w-5" />,
      action: "Schedule more posts for 3 PM"
    },
    {
      title: "Top Performing Category",
      description: "Marketing content generates 34% more engagement than other categories",
      type: 'info',
      icon: <BarChart3 className="h-5 w-5" />,
      action: "Create more marketing content"
    },
    {
      title: "Hashtag Optimization",
      description: "Posts with 5-8 hashtags perform 18% better than those with fewer",
      type: 'recommendation',
      icon: <Hash className="h-5 w-5" />,
      action: "Optimize hashtag usage"
    },
    {
      title: "Engagement Drop Alert",
      description: "Your weekend posts see 15% lower engagement - consider weekday focus",
      type: 'warning',
      icon: <AlertCircle className="h-5 w-5" />,
      action: "Adjust weekend strategy"
    },
    {
      title: "Content Length Impact",
      description: "Longer descriptions (100+ characters) get 12% more saves",
      type: 'info',
      icon: <FileText className="h-5 w-5" />,
      action: "Optimize descriptions"
    },
    {
      title: "Visual Style Success",
      description: "Infographics outperform other content types by 28%",
      type: 'success',
      icon: <Award className="h-5 w-5" />,
      action: "Increase infographic creation"
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'recommendation': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your Pinterest performance and optimize your strategy</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className="text-gray-400">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                {metric.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-sm text-gray-500">vs last period</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>Track your engagement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="engagement" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Compare engagement across content categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Content Type Performance and Top Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Type Performance</CardTitle>
            <CardDescription>Distribution of your content types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your best content this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                      <Badge className={`text-xs ${getPerformanceColor(post.performance)}`}>
                        {post.performance}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{post.engagement}%</div>
                    <div className="text-xs text-gray-500">{post.saves} saves</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>AI Insights & Recommendations</span>
          </CardTitle>
          <CardDescription>Data-driven insights to optimize your Pinterest strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm mb-2">{insight.description}</p>
                    {insight.action && (
                      <Button variant="outline" size="sm" className="text-xs">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Posting Times Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Best Posting Times Heatmap</CardTitle>
          <CardDescription>Optimal times to post for maximum engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-1 text-xs">
              {/* Header */}
              <div className="font-medium text-gray-600 p-2"></div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="font-medium text-gray-600 p-2 text-center">{day}</div>
              ))}
              
              {/* Heatmap rows */}
              {postingTimesData.map((row, index) => (
                <div key={index} className="contents">
                  <div className="font-medium text-gray-600 p-2 text-right">{row.hour}</div>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                    const value = row[day] as number;
                    const intensity = Math.min(value / 100, 1);
                    const bgColor = intensity > 0.7 ? 'bg-green-500' : 
                                   intensity > 0.5 ? 'bg-green-400' : 
                                   intensity > 0.3 ? 'bg-green-300' : 'bg-green-100';
                    return (
                      <div 
                        key={day} 
                        className={`p-2 text-center text-white rounded ${bgColor}`}
                        title={`${day} ${row.hour}: ${value}% engagement`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export & Reporting */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Reporting</CardTitle>
          <CardDescription>Generate reports and export your analytics data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">PDF Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span className="text-sm">CSV Export</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Email Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Schedule Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}