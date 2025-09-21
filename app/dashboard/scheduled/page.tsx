"use client";

import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Pin,
  Edit,
  Trash2,
  Play,
  Pause,
  MoreHorizontal,
  Plus,
  Filter,
  SortAsc
} from "lucide-react";

export default function ScheduledPostsPage() {
  const scheduledPosts = [
    {
      id: 1,
      title: "Pinterest Marketing Strategy Guide",
      description: "Complete guide to growing your business with Pinterest marketing",
      image: "/placeholder.jpg",
      scheduledDate: "2024-01-20",
      scheduledTime: "14:30",
      status: "scheduled",
      board: "Marketing Tips",
    },
    {
      id: 2,
      title: "Pinterest Analytics Deep Dive",
      description: "Understanding your Pinterest analytics to improve performance",
      image: "/placeholder.jpg",
      scheduledDate: "2024-01-21",
      scheduledTime: "10:00",
      status: "scheduled",
      board: "Analytics",
    },
    {
      id: 3,
      title: "Creating Viral Pinterest Content",
      description: "Secrets to creating Pinterest posts that go viral",
      image: "/placeholder.jpg",
      scheduledDate: "2024-01-22",
      scheduledTime: "16:45",
      status: "paused",
      board: "Content Strategy",
    },
    {
      id: 4,
      title: "Pinterest SEO Best Practices",
      description: "Optimize your Pinterest posts for better search visibility",
      image: "/placeholder.jpg",
      scheduledDate: "2024-01-23",
      scheduledTime: "11:15",
      status: "scheduled",
      board: "SEO Tips",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "published": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage your scheduled Pinterest posts and campaigns
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Post
        </Button>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by Date
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {scheduledPosts.length} posts scheduled
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {scheduledPosts.filter(p => p.status === "scheduled").length}
            </p>
            <p className="text-sm text-gray-600">Scheduled</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {scheduledPosts.filter(p => p.status === "paused").length}
            </p>
            <p className="text-sm text-gray-600">Paused</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Published Today</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">2</p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>
        </div>
      </div>

      {/* Calendar View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Posts</h2>
        <div className="flex border border-gray-300 rounded-lg">
          <button className="px-4 py-2 text-sm bg-primary text-white rounded-l-lg">
            List View
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-r-lg">
            Calendar View
          </button>
        </div>
      </div>

      {/* Scheduled Posts List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Board
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scheduledPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <Pin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{post.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.scheduledDate}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.scheduledTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {post.board}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {post.status === "scheduled" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
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
      </div>

      {/* Calendar Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar Preview</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const hasPost = scheduledPosts.some(post => 
              post.scheduledDate === `2024-01-${day.toString().padStart(2, '0')}`
            );
            return (
              <div
                key={day}
                className={`p-2 text-sm rounded-lg ${
                  hasPost 
                    ? "bg-primary text-white" 
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            Pause All Scheduled
          </Button>
          <Button variant="outline" size="sm">
            Reschedule All
          </Button>
          <Button variant="outline" size="sm">
            Export Schedule
          </Button>
          <Button variant="outline" size="sm">
            Import Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}
