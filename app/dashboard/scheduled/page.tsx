"use client";

import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { 
  Calendar, 
  Clock, 
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Settings,
  TrendingUp,
  Globe,
  GripVertical,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface ScheduledPost {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  status: 'scheduled' | 'processing' | 'failed' | 'completed';
  category: string;
  image: string;
  board: string;
  timezone: string;
  performance?: number;
  conflicts?: string[];
  optimalTime?: boolean;
}

export default function ScheduledPostsPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "timeline" | "queue">("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [draggedPost, setDraggedPost] = useState<number | null>(null);
  const [showBulkTools, setShowBulkTools] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPostForScheduling, setSelectedPostForScheduling] = useState<ScheduledPost | null>(null);

  // Mock data with 30+ scheduled posts
  const scheduledPosts: ScheduledPost[] = useMemo(() => [
    {
      id: 1,
      title: "10 Essential Pinterest Marketing Tips",
      description: "Learn the most effective strategies to grow your Pinterest presence",
      scheduledDate: "2024-01-20T14:00:00",
      status: "scheduled",
      category: "Marketing",
      image: "https://picsum.photos/400/600?random=1",
      board: "Marketing Tips",
      timezone: "EST",
      performance: 85,
      optimalTime: true
    },
    {
      id: 2,
      title: "Pinterest SEO: Complete Guide for Bloggers",
      description: "Optimize your Pinterest posts for better search visibility",
      scheduledDate: "2024-01-22T10:30:00",
      status: "scheduled",
      category: "SEO",
      image: "https://picsum.photos/400/600?random=2",
      board: "SEO Strategies",
      timezone: "EST",
      performance: 72,
      optimalTime: false
    },
    {
      id: 3,
      title: "Design Trends That Will Dominate Pinterest",
      description: "Stay ahead with these design trends taking Pinterest by storm",
      scheduledDate: "2024-01-25T16:00:00",
      status: "processing",
      category: "Design",
      image: "https://picsum.photos/400/600?random=3",
      board: "Design Inspiration",
      timezone: "EST",
      performance: 79,
      optimalTime: true
    },
    {
      id: 4,
      title: "Content Creation Workflow for Pinterest",
      description: "Streamline your content creation process for maximum efficiency",
      scheduledDate: "2024-01-28T12:00:00",
      status: "failed",
      category: "Content",
      image: "https://picsum.photos/400/600?random=4",
      board: "Content Ideas",
      timezone: "EST",
      performance: 0,
      optimalTime: false,
      conflicts: ["Too many posts at same time"]
    },
    {
      id: 5,
      title: "Pinterest Analytics Deep Dive",
      description: "Understanding your Pinterest metrics to improve performance",
      scheduledDate: "2024-02-01T14:00:00",
      status: "scheduled",
      category: "Analytics",
      image: "https://picsum.photos/400/600?random=5",
      board: "Analytics Insights",
      timezone: "EST",
      performance: 68,
      optimalTime: true
    },
    // Add more posts for the next 3 months
    ...Array.from({ length: 45 }, (_, i) => {
      const categories = ["Marketing", "SEO", "Design", "Content", "Analytics", "Engagement", "Automation", "Community", "E-commerce", "Lifestyle"];
      const boards = ["Marketing Tips", "SEO Strategies", "Design Inspiration", "Content Ideas", "Analytics Insights", "Community Building", "Business Growth", "Creative Ideas"];
      const statuses: ('scheduled' | 'processing' | 'failed' | 'completed')[] = ['scheduled', 'processing', 'failed', 'completed'];
      
      const dayOffset = Math.floor(i / 4) + 1;
      const hourOffset = [9, 12, 15, 18][i % 4]; // 9 AM, 12 PM, 3 PM, 6 PM
      const date = new Date(2024, 0, 20 + dayOffset);
      date.setHours(hourOffset, [0, 15, 30, 45][i % 4], 0, 0); // Vary minutes
      
      const status = statuses[i % 4];
      const hasConflict = i % 8 === 0; // Some posts have conflicts
      const isOptimal = hourOffset === 15; // 3 PM is optimal
      
      const postTitles = [
        `Ultimate Pinterest Marketing Guide for ${categories[i % categories.length]}`,
        `${categories[i % categories.length]} Best Practices That Actually Work`,
        `How to Dominate Pinterest in ${categories[i % categories.length]}`,
        `The Complete ${categories[i % categories.length]} Strategy Playbook`,
        `Pinterest Secrets Every ${categories[i % categories.length]} Professional Needs`,
        `Transform Your ${categories[i % categories.length]} with These Pinterest Tips`,
        `The ${categories[i % categories.length]} Blueprint for Pinterest Success`,
        `Advanced ${categories[i % categories.length]} Techniques for Pinterest`
      ];
      
      const descriptions = [
        `Discover proven strategies to skyrocket your ${categories[i % categories.length].toLowerCase()} presence on Pinterest`,
        `Learn the insider secrets that top ${categories[i % categories.length].toLowerCase()} brands use to dominate Pinterest`,
        `Master the art of ${categories[i % categories.length].toLowerCase()} marketing with these expert tips`,
        `Unlock the power of Pinterest for your ${categories[i % categories.length].toLowerCase()} business`,
        `Get ahead of the competition with these ${categories[i % categories.length].toLowerCase()} Pinterest strategies`,
        `Revolutionize your ${categories[i % categories.length].toLowerCase()} approach with Pinterest best practices`
      ];
      
      return {
        id: i + 6,
        title: postTitles[i % postTitles.length],
        description: descriptions[i % descriptions.length],
        scheduledDate: date.toISOString(),
        status,
        category: categories[i % categories.length],
        image: `https://picsum.photos/400/600?random=${i + 6}`,
        board: boards[i % boards.length],
        timezone: "EST",
        performance: status === 'failed' ? 0 : Math.floor(Math.random() * 35) + 65,
        optimalTime: isOptimal,
        conflicts: hasConflict ? ["Too many posts at same time", "Low engagement period"] : undefined
      };
    })
  ], []);

  // Get posts for selected date
  const postsForDate = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return scheduledPosts.filter(post => 
      post.scheduledDate.split('T')[0] === dateStr
    );
  }, [scheduledPosts, selectedDate]);

  // Get upcoming posts for timeline
  const upcomingPosts = useMemo(() => {
    const now = new Date();
    return scheduledPosts
      .filter(post => new Date(post.scheduledDate) > now)
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  }, [scheduledPosts]);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getPostsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduledPosts.filter(post => 
      post.scheduledDate.split('T')[0] === dateStr
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Drag and drop handlers
  const handleDragStart = (postId: number) => {
    setDraggedPost(postId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetDate: Date) => {
    e.preventDefault();
    if (draggedPost) {
      // In a real app, this would update the database
      console.log(`Moving post ${draggedPost} to ${targetDate.toISOString()}`);
      setDraggedPost(null);
    }
  };

  // Handle scheduling a new post
  const handleSchedulePost = () => {
    // Create a new post for scheduling
    const newPost: ScheduledPost = {
      id: Date.now(),
      title: "New Pinterest Post",
      description: "Click to edit this post description",
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: "scheduled",
      category: "Marketing",
      image: "https://picsum.photos/400/600?random=999",
      board: "Marketing Tips",
      timezone: "EST",
      performance: 75,
      optimalTime: true
    };
    
    setSelectedPostForScheduling(newPost);
    setShowScheduleModal(true);
  };

  // Handle rescheduling existing post
  const handleReschedulePost = (post: ScheduledPost) => {
    setSelectedPostForScheduling(post);
    setShowScheduleModal(true);
  };

  // Handle saving scheduled post
  const handleSaveScheduledPost = (updatedPost: ScheduledPost) => {
    console.log('Saving scheduled post:', updatedPost);
    // In a real app, this would update the database
    setShowScheduleModal(false);
    setSelectedPostForScheduling(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage your scheduled Pinterest posts and optimize your posting schedule
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </Button>
          <Button onClick={handleSchedulePost}>
          <Plus className="h-4 w-4 mr-2" />
            Schedule Post
        </Button>
        </div>
      </div>

      {/* View Toggle and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === "calendar" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 text-sm font-medium border-l border-r border-gray-300 ${
                viewMode === "timeline" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Clock className="h-4 w-4 mr-2 inline" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode("queue")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                viewMode === "queue" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Queue
            </button>
      </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowBulkTools(!showBulkTools)}>
              <Settings className="h-4 w-4 mr-2" />
              Bulk Tools
            </Button>
          </div>
        </div>

        {/* Bulk Tools Panel */}
        {showBulkTools && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Bulk Scheduling Tools</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Schedule Empty Slots
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Optimize Timing
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reschedule Selected
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Conflicts
            </Button>
          </div>
          </div>
        )}
      </div>

      {/* Content based on view mode */}
      {viewMode === "calendar" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
          </div>
        </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(selectedDate).map((date, index) => {
              const postsForDay = date ? getPostsForDay(date) : [];
              const isToday = date && date.toDateString() === new Date().toDateString();
              const isSelected = date && date.toDateString() === selectedDate.toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    isToday ? 'bg-primary/10 border-primary' : ''
                  } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => date && setSelectedDate(date)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => date && handleDrop(e, date)}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-primary' : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {postsForDay.slice(0, 2).map(post => (
                          <div
                            key={post.id}
                            className={`text-xs p-1 rounded truncate cursor-move ${
                              post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              post.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              post.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-green-100 text-green-800'
                            }`}
                            draggable
                            onDragStart={() => handleDragStart(post.id)}
                          >
                            {formatTime(post.scheduledDate)} - {post.title.slice(0, 15)}...
                          </div>
                        ))}
                        {postsForDay.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{postsForDay.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Date Posts */}
          {postsForDate.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">
                Posts for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <div className="space-y-3">
                {postsForDate.map(post => (
                  <div key={post.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-500">{post.category} • {formatTime(post.scheduledDate)}</p>
          </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleReschedulePost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
          </div>
          </div>
                ))}
          </div>
        </div>
          )}
      </div>
      )}

      {viewMode === "timeline" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Timeline View</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{upcomingPosts.length} upcoming posts</span>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                EST Timezone
              </Button>
        </div>
      </div>

          <div className="space-y-4">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                  {post.optimalTime && (
                    <div className="mt-1 w-2 h-2 bg-green-500 rounded-full" title="Optimal posting time"></div>
                  )}
                      </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    {post.conflicts && (
                      <AlertCircle className="h-4 w-4 text-red-500" title={post.conflicts.join(', ')} />
                    )}
                    </div>
                  <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.board}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      {post.performance}% predicted performance
                    </span>
                        </div>
                      </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatTime(post.scheduledDate)}</div>
                  <div className="text-xs text-gray-500">{formatDate(post.scheduledDate)}</div>
                    </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  <Button variant="outline" size="sm" onClick={() => handleReschedulePost(post)}>
                    <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                        </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "queue" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Queue Management</h2>
            <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Optimize
                      </Button>
                      <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Queue
              </Button>
            </div>
          </div>

          {/* Queue Health */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Queue Health</p>
                  <p className="text-2xl font-bold text-green-700">Good</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Scheduled Posts</p>
                  <p className="text-2xl font-bold text-blue-700">{scheduledPosts.filter(p => p.status === 'scheduled').length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">Conflicts</p>
                  <p className="text-2xl font-bold text-yellow-700">{scheduledPosts.filter(p => p.conflicts).length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Avg Performance</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {Math.round(scheduledPosts.filter(p => p.performance).reduce((acc, p) => acc + (p.performance || 0), 0) / scheduledPosts.filter(p => p.performance).length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Draggable Queue */}
          <div className="space-y-3">
            {upcomingPosts.slice(0, 10).map((post, index) => (
              <div
                key={post.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-move"
                draggable
                onDragStart={() => handleDragStart(post.id)}
              >
                <div className="flex flex-col items-center space-y-1">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{index + 1}</span>
                </div>
                
                <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    {post.optimalTime && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Optimal</span>
                    )}
                    {post.conflicts && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Conflict</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{formatTime(post.scheduledDate)}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      {post.performance}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleReschedulePost(post)}>
                    <Edit className="h-4 w-4" />
                      </Button>
                    </div>
              </div>
            ))}
          </div>

          {/* Queue Optimization Suggestions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Optimization Suggestions</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Move 3 posts to optimal time slots for 15% better engagement</p>
              <p>• Resolve 2 scheduling conflicts to avoid audience overlap</p>
              <p>• Consider spacing posts 4+ hours apart for better reach</p>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {showScheduleModal && selectedPostForScheduling && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Schedule Post</h2>
                <Button variant="ghost" onClick={() => setShowScheduleModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Post Preview */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={selectedPostForScheduling.image} alt={selectedPostForScheduling.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{selectedPostForScheduling.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{selectedPostForScheduling.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{selectedPostForScheduling.category}</span>
                        <span>•</span>
                        <span>{selectedPostForScheduling.board}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduling Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      defaultValue={selectedPostForScheduling.scheduledDate.split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      defaultValue={formatTime(selectedPostForScheduling.scheduledDate).replace(' AM', '').replace(' PM', '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
        </div>
      </div>

                {/* Optimal Times */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Optimal Posting Times</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { time: "09:00", score: 78, label: "Morning commute" },
                      { time: "12:00", score: 85, label: "Lunch break" },
                      { time: "15:00", score: 95, label: "Peak engagement" },
                      { time: "18:00", score: 82, label: "Evening browsing" }
                    ].map((time, index) => (
                      <button
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <div>
                          <div className="text-sm font-medium">{time.time}</div>
                          <div className="text-xs text-gray-500">{time.label}</div>
            </div>
                        <div className="text-sm font-medium text-green-600">{time.score}%</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Board Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pinterest Board</label>
                  <select
                    defaultValue={selectedPostForScheduling.board}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Marketing Tips">Marketing Tips</option>
                    <option value="SEO Strategies">SEO Strategies</option>
                    <option value="Design Inspiration">Design Inspiration</option>
                    <option value="Content Ideas">Content Ideas</option>
                    <option value="Analytics Insights">Analytics Insights</option>
                    <option value="Community Building">Community Building</option>
                    <option value="Business Growth">Business Growth</option>
                    <option value="Creative Ideas">Creative Ideas</option>
                  </select>
                </div>

                {/* Performance Prediction */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Performance Prediction</h4>
                      <p className="text-sm text-blue-800">Based on optimal timing and content</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{selectedPostForScheduling.performance}%</div>
                  </div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedPostForScheduling.performance}%` }}
                    ></div>
              </div>
        </div>
      </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
          </Button>
                <Button onClick={() => handleSaveScheduledPost(selectedPostForScheduling)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
          </Button>
        </div>
      </div>
          </div>
        </div>
      )}
    </div>
  );
}
