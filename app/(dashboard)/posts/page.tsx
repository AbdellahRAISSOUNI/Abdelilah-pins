"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  SortAsc, 
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
  Upload,
  CheckSquare,
  Square
} from "lucide-react";

export default function MyPostsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  // const [sortBy, setSortBy] = useState("newest");

  const posts = [
    {
      id: 1,
      title: "10 Tips for Better Pinterest Posts",
      description: "Learn how to create engaging Pinterest content that drives traffic to your blog",
      image: "/placeholder.jpg",
      status: "published",
      views: 1240,
      saves: 45,
      shares: 12,
      date: "2024-01-15",
      category: "Tutorials",
    },
    {
      id: 2,
      title: "Pinterest Marketing Strategy Guide",
      description: "Complete guide to growing your business with Pinterest marketing",
      image: "/placeholder.jpg",
      status: "scheduled",
      views: 890,
      saves: 32,
      shares: 8,
      date: "2024-01-14",
      category: "Marketing",
    },
    {
      id: 3,
      title: "How to Increase Pinterest Engagement",
      description: "Proven strategies to boost your Pinterest engagement rates",
      image: "/placeholder.jpg",
      status: "draft",
      views: 0,
      saves: 0,
      shares: 0,
      date: "2024-01-13",
      category: "Tips",
    },
    {
      id: 4,
      title: "Pinterest SEO Best Practices",
      description: "Optimize your Pinterest posts for better search visibility",
      image: "/placeholder.jpg",
      status: "published",
      views: 2100,
      saves: 78,
      shares: 23,
      date: "2024-01-12",
      category: "SEO",
    },
    {
      id: 5,
      title: "Creating Viral Pinterest Content",
      description: "Secrets to creating Pinterest posts that go viral",
      image: "/placeholder.jpg",
      status: "published",
      views: 3400,
      saves: 156,
      shares: 45,
      date: "2024-01-11",
      category: "Content",
    },
    {
      id: 6,
      title: "Pinterest Analytics Deep Dive",
      description: "Understanding your Pinterest analytics to improve performance",
      image: "/placeholder.jpg",
      status: "scheduled",
      views: 560,
      saves: 18,
      shares: 4,
      date: "2024-01-10",
      category: "Analytics",
    },
  ];

  const togglePostSelection = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const selectAllPosts = () => {
    setSelectedPosts(posts.map(post => post.id));
  };

  const clearSelection = () => {
    setSelectedPosts([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your Pinterest posts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>

          {/* View Mode and Bulk Actions */}
          <div className="flex items-center space-x-3">
            {selectedPosts.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear ({selectedPosts.length})
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
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
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.status === "published").length}
            </p>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {posts.filter(p => p.status === "scheduled").length}
            </p>
            <p className="text-sm text-gray-600">Scheduled</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">
              {posts.filter(p => p.status === "draft").length}
            </p>
            <p className="text-sm text-gray-600">Drafts</p>
          </div>
        </div>
      </div>

      {/* Posts Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {viewMode === "grid" ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Checkbox */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => togglePostSelection(post.id)}
                        className="flex items-center space-x-2"
                      >
                        {selectedPosts.includes(post.id) ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-500">Select</span>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Pin className="h-12 w-12 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <span className="text-xs text-gray-500">{post.category}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.description}</p>
                    
                    {/* Stats */}
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

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
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
                      onClick={selectedPosts.length === posts.length ? clearSelection : selectAllPosts}
                      className="flex items-center space-x-2"
                    >
                      {selectedPosts.length === posts.length ? (
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
                {posts.map((post) => (
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
                        <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <Pin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
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
                    <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
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
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{posts.length}</span> of{" "}
          <span className="font-medium">{posts.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            2
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
