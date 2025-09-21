"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Grid3X3, 
  List,
  Pin,
  Eye,
  Heart,
  Share2,
  Calendar,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  CheckSquare,
  Square,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  BarChart3
} from "lucide-react";
import { PostEditor } from "@/components/dashboard/post-editor";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  status: 'draft' | 'scheduled' | 'published';
  views: number;
  saves: number;
  shares: number;
  date: string;
  scheduledDate?: string;
  category: string;
  sourceUrl: string;
  performance: number;
}

export default function MyPostsPage() {
  // UI State
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  // const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPreview, setShowPreview] = useState<number | null>(null);
  
  // Mock data with 50+ posts
  const posts: Post[] = useMemo(() => [
    {
      id: 1,
      title: "10 Essential Tips for Better Pinterest Marketing",
      description: "Learn how to create engaging Pinterest content that drives traffic to your blog and increases engagement rates significantly.",
      image: "https://picsum.photos/400/600?random=1",
      status: "published",
      views: 1240,
      saves: 45,
      shares: 12,
      date: "2024-01-15",
      category: "Marketing",
      sourceUrl: "https://example.com/pinterest-tips",
      performance: 85
    },
    {
      id: 2,
      title: "Pinterest SEO: Complete Guide for Bloggers",
      description: "Optimize your Pinterest posts for better search visibility and organic reach with these proven SEO strategies.",
      image: "https://picsum.photos/400/600?random=2",
      status: "scheduled",
      scheduledDate: "2024-01-20T14:30:00",
      views: 890,
      saves: 32,
      shares: 8,
      date: "2024-01-14",
      category: "SEO",
      sourceUrl: "https://example.com/pinterest-seo",
      performance: 72
    },
    {
      id: 3,
      title: "How to Increase Pinterest Engagement",
      description: "Proven strategies to boost your Pinterest engagement rates and build a loyal following on the platform.",
      image: "https://picsum.photos/400/600?random=3",
      status: "draft",
      views: 0,
      saves: 0,
      shares: 0,
      date: "2024-01-13",
      category: "Engagement",
      sourceUrl: "https://example.com/engagement-tips",
      performance: 0
    },
    {
      id: 4,
      title: "Creating Viral Pinterest Content",
      description: "Secrets to creating Pinterest posts that go viral and generate massive engagement and traffic.",
      image: "https://picsum.photos/400/600?random=4",
      status: "published",
      views: 3400,
      saves: 156,
      shares: 45,
      date: "2024-01-12",
      category: "Content",
      sourceUrl: "https://example.com/viral-content",
      performance: 92
    },
    {
      id: 5,
      title: "Pinterest Analytics Deep Dive",
      description: "Understanding your Pinterest analytics to improve performance and make data-driven decisions.",
      image: "https://picsum.photos/400/600?random=5",
      status: "scheduled",
      scheduledDate: "2024-01-22T10:00:00",
      views: 560,
      saves: 18,
      shares: 4,
      date: "2024-01-11",
      category: "Analytics",
      sourceUrl: "https://example.com/pinterest-analytics",
      performance: 68
    },
    {
      id: 6,
      title: "Design Trends That Will Dominate Pinterest",
      description: "Stay ahead of the curve with these design trends that are taking Pinterest by storm this year.",
      image: "https://picsum.photos/400/600?random=6",
      status: "published",
      views: 2100,
      saves: 78,
      shares: 23,
      date: "2024-01-10",
      category: "Design",
      sourceUrl: "https://example.com/design-trends",
      performance: 79
    },
    {
      id: 7,
      title: "Pinterest vs Instagram: Which Platform is Better?",
      description: "A comprehensive comparison of Pinterest and Instagram for business marketing and brand growth.",
      image: "https://picsum.photos/400/600?random=7",
      status: "draft",
      views: 0,
      saves: 0,
      shares: 0,
      date: "2024-01-09",
      category: "Comparison",
      sourceUrl: "https://example.com/pinterest-vs-instagram",
      performance: 0
    },
    {
      id: 8,
      title: "Advanced Pinterest Automation Strategies",
      description: "Learn how to automate your Pinterest marketing while maintaining authentic engagement and growth.",
      image: "https://picsum.photos/400/600?random=8",
      status: "published",
      views: 1800,
      saves: 67,
      shares: 19,
      date: "2024-01-08",
      category: "Automation",
      sourceUrl: "https://example.com/pinterest-automation",
      performance: 81
    },
    {
      id: 9,
      title: "Building a Pinterest Community: Best Practices",
      description: "Discover the secrets to building an engaged Pinterest community that drives traffic and conversions.",
      image: "https://picsum.photos/400/600?random=9",
      status: "scheduled",
      scheduledDate: "2024-01-25T16:00:00",
      views: 420,
      saves: 15,
      shares: 3,
      date: "2024-01-07",
      category: "Community",
      sourceUrl: "https://example.com/pinterest-community",
      performance: 63
    },
    {
      id: 10,
      title: "The Psychology Behind Pinterest User Behavior",
      description: "Understanding the psychology behind Pinterest users to create content that resonates and converts.",
      image: "https://picsum.photos/400/600?random=10",
      status: "published",
      views: 2900,
      saves: 134,
      shares: 38,
      date: "2024-01-06",
      category: "Psychology",
      sourceUrl: "https://example.com/pinterest-psychology",
      performance: 88
    },
    // Add more posts to reach 50+
    ...Array.from({ length: 40 }, (_, i) => {
      const categories = ["Marketing", "SEO", "Design", "Content", "Analytics", "Engagement", "Automation", "Community"];
      const statuses: ('draft' | 'scheduled' | 'published')[] = ['draft', 'scheduled', 'published'];
      const status = statuses[i % 3];
      
      return {
        id: i + 11,
        title: `Pinterest Marketing Tip #${i + 11}: Advanced Strategy Guide`,
        description: `Comprehensive guide covering advanced Pinterest marketing strategies for ${categories[i % categories.length].toLowerCase()} professionals.`,
        image: `https://picsum.photos/400/600?random=${i + 11}`,
        status,
        scheduledDate: status === 'scheduled' ? `2024-01-${25 + (i % 5)}T${10 + (i % 8)}:00:00` : undefined,
        views: status === 'draft' ? 0 : Math.floor(Math.random() * 3000) + 100,
        saves: status === 'draft' ? 0 : Math.floor(Math.random() * 150) + 10,
        shares: status === 'draft' ? 0 : Math.floor(Math.random() * 50) + 5,
        date: `2024-01-${15 - (i % 10)}`,
        category: categories[i % categories.length],
        sourceUrl: `https://example.com/post-${i + 11}`,
        performance: status === 'draft' ? 0 : Math.floor(Math.random() * 40) + 60
      };
    })
  ], []);

  // Filtering and sorting logic
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "performance":
          return b.performance - a.performance;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, statusFilter, sortBy]);

  // Pagination
  const postsPerPage = 20;
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  // Selection handlers
  const togglePostSelection = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const selectAllPosts = () => {
    setSelectedPosts(currentPosts.map(post => post.id));
  };

  const clearSelection = () => {
    setSelectedPosts([]);
  };

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle post updates from editor
  const handlePostUpdate = (updatedPost: Post) => {
    // In a real app, this would update the database
    console.log('Updated post:', updatedPost);
    // For now, just close the editor
    setEditingPost(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedPosts.length > 0) {
        // Handle bulk delete
        console.log('Delete selected posts:', selectedPosts);
      }
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        selectAllPosts();
      }
      if (e.key === 'Escape') {
        clearSelection();
        setEditingPost(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPosts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your Pinterest posts ({filteredAndSortedPosts.length} total)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">A-Z</option>
            <option value="performance">Best Performance</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{filteredAndSortedPosts.length}</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {filteredAndSortedPosts.filter(p => p.status === "published").length}
            </p>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {filteredAndSortedPosts.filter(p => p.status === "scheduled").length}
            </p>
            <p className="text-sm text-gray-600">Scheduled</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">
              {filteredAndSortedPosts.filter(p => p.status === "draft").length}
            </p>
            <p className="text-sm text-gray-600">Drafts</p>
          </div>
        </div>
      </div>

      {/* Bulk Operations Bar */}
      {selectedPosts.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">
                {selectedPosts.length} posts selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule All
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={clearSelection}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Posts Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {currentPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Create your first Pinterest post to get started"
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Post
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPosts.map((post) => (
                <div key={post.id} className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <button
                      onClick={() => togglePostSelection(post.id)}
                      className="p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                    >
                      {selectedPosts.includes(post.id) ? (
                        <CheckSquare className="h-4 w-4 text-primary" />
                      ) : (
                        <Square className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  {/* Image */}
                  <div 
                    className="aspect-[4/5] bg-gray-100 cursor-pointer relative overflow-hidden"
                    onClick={() => setShowPreview(post.id)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">{post.category}</span>
                      {post.performance > 0 && (
                        <div className="flex items-center text-xs text-gray-500">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          {post.performance}%
                        </div>
                      )}
                    </div>
                    
                    <h3 
                      className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setEditingPost(post)}
                    >
                      {post.title}
                    </h3>
                    
                    <p 
                      className="text-sm text-gray-600 mb-3 line-clamp-2 cursor-pointer hover:text-gray-800 transition-colors"
                      onClick={() => setEditingPost(post)}
                    >
                      {post.description}
                    </p>
                    
                    {/* Stats */}
                    {post.status !== 'draft' && (
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => setShowPreview(post.id)}
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Source Link */}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <a 
                        href={post.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Source
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={currentPosts.every(post => selectedPosts.includes(post.id)) ? clearSelection : selectAllPosts}
                      className="flex items-center space-x-2"
                    >
                      {currentPosts.every(post => selectedPosts.includes(post.id)) ? (
                        <CheckSquare className="h-4 w-4 text-primary" />
                      ) : (
                        <Square className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-xs font-medium text-gray-500">Select All</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePostSelection(post.id)}
                        className="flex items-center"
                      >
                        {selectedPosts.includes(post.id) ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(post.date)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedPosts.length)} of {filteredAndSortedPosts.length} posts
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNumber > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Post Preview</h2>
                <Button variant="ghost" onClick={() => setShowPreview(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-[4/5] bg-gray-100 rounded-lg mb-4">
                <img 
                  src={currentPosts.find(p => p.id === showPreview)?.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{currentPosts.find(p => p.id === showPreview)?.title}</h3>
                <p className="text-gray-600">{currentPosts.find(p => p.id === showPreview)?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Editor */}
      {editingPost && (
        <PostEditor
          post={editingPost}
          isOpen={true}
          onClose={() => setEditingPost(null)}
          onSave={handlePostUpdate}
        />
      )}
    </div>
  );
}
