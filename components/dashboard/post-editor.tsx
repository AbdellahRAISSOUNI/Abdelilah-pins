"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  X,
  Save,
  Calendar,
  Send,
  Trash2,
  Copy,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Hash,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit3
} from "lucide-react";

interface PostEditorProps {
  post: {
    id: number;
    title: string;
    description: string;
    image: string;
    status: 'draft' | 'scheduled' | 'published';
    category: string;
    sourceUrl: string;
    scheduledDate?: string;
    views?: number;
    saves?: number;
    shares?: number;
    date?: string;
    performance?: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: any) => void;
}

export function PostEditor({ post, isOpen, onClose, onSave }: PostEditorProps) {
  // Form state
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  // const [image, setImage] = useState(post.image);
  const [sourceUrl, setSourceUrl] = useState(post.sourceUrl);
  const [category, setCategory] = useState(post.category);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  // Scheduling state
  const [scheduleDate, setScheduleDate] = useState(post.scheduledDate || "");
  const [scheduleTime, setScheduleTime] = useState("14:00");
  const [timezone, setTimezone] = useState("UTC");
  const [boardSelection, setBoardSelection] = useState("Main Board");
  const [audienceTargeting, setAudienceTargeting] = useState("General");
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [abTestTitle, setAbTestTitle] = useState("");
  // const [customParams, setCustomParams] = useState("");
  // const [recurringSchedule, setRecurringSchedule] = useState(false);
  
  // UI state
  const [previewMode, setPreviewMode] = useState<"square" | "portrait" | "landscape">("portrait");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  // const [showImageUpload, setShowImageUpload] = useState(false);

  // Mock data
  const categories = [
    "Marketing", "SEO", "Design", "Content", "Analytics", 
    "Engagement", "Automation", "Community", "Psychology", "Comparison"
  ];

  const mockBoards = [
    "Main Board", "Marketing Tips", "SEO Strategies", "Design Inspiration", 
    "Content Ideas", "Analytics Insights", "Community Building"
  ];

  const audienceOptions = [
    "General", "Marketing Professionals", "Small Business Owners", 
    "Content Creators", "E-commerce", "B2B", "B2C"
  ];

  const timezones = [
    "UTC", "EST (UTC-5)", "PST (UTC-8)", "CST (UTC-6)", 
    "MST (UTC-7)", "GMT (UTC+0)", "CET (UTC+1)"
  ];

  const optimalTimes = [
    { time: "14:00", score: 95, label: "Peak engagement" },
    { time: "20:00", score: 88, label: "Evening browsing" },
    { time: "09:00", score: 75, label: "Morning commute" },
    { time: "12:00", score: 82, label: "Lunch break" }
  ];

  // Character limits
  const titleLimit = 100;
  const descriptionLimit = 500;

  // Calculate SEO score
  const calculateSEOScore = () => {
    let score = 0;
    
    if (title.length >= 20 && title.length <= 60) score += 25;
    if (description.length >= 150 && description.length <= 300) score += 25;
    if (tags.length >= 3 && tags.length <= 10) score += 20;
    if (category) score += 15;
    if (sourceUrl) score += 15;
    
    return Math.min(score, 100);
  };

  const seoScore = calculateSEOScore();

  // Auto-save simulation
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        setIsAutoSaving(true);
        setTimeout(() => {
          setIsAutoSaving(false);
          setHasUnsavedChanges(false);
        }, 1000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [title, description, image, sourceUrl, category, tags]);

  // Handle tag addition
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setHasUnsavedChanges(true);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setHasUnsavedChanges(true);
  };

  // Handle form submission
  const handleSave = (action: 'draft' | 'schedule' | 'publish') => {
    const updatedPost = {
      ...post,
      title,
      description,
      image,
      sourceUrl,
      category,
      tags,
      status: action === 'draft' ? 'draft' : action === 'schedule' ? 'scheduled' : 'published',
      scheduledDate: action === 'schedule' ? `${scheduleDate}T${scheduleTime}:00` : undefined
    };
    
    onSave(updatedPost);
    onClose();
  };

  // Handle duplicate
  const handleDuplicate = () => {
    const duplicatedPost = {
      ...post,
      id: Date.now(),
      title: `${title} (Copy)`,
      status: 'draft' as const
    };
    
    onSave(duplicatedPost);
    onClose();
  };

  // Handle delete
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      onSave({ ...post, status: 'deleted' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Edit3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Edit Post</h2>
            {isAutoSaving && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                Auto-saving...
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Preview */}
          <div className="flex-1 p-6 border-r border-gray-200 overflow-auto">
            <div className="space-y-6">
              {/* Preview Controls */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Preview</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewMode === "square" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("square")}
                  >
                    Square
                  </Button>
                  <Button
                    variant={previewMode === "portrait" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("portrait")}
                  >
                    Portrait
                  </Button>
                  <Button
                    variant={previewMode === "landscape" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("landscape")}
                  >
                    Landscape
                  </Button>
                </div>
              </div>

              {/* Pinterest Post Preview */}
              <div className="flex justify-center">
                <div className={`bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden ${
                  previewMode === "square" ? "w-80 h-80" :
                  previewMode === "portrait" ? "w-80 h-[480px]" :
                  "w-96 h-72"
                }`}>
                  {/* Image */}
                  <div className={`bg-gray-100 relative ${
                    previewMode === "square" ? "h-80" :
                    previewMode === "portrait" ? "h-80" :
                    "h-48"
                  }`}>
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setShowImageUpload(true)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">{category}</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        {seoScore}% SEO
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {title || "Your post title will appear here..."}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {description || "Your post description will appear here..."}
                    </p>
                    
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SEO Score */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">SEO Score</h4>
                  <span className={`text-sm font-medium ${
                    seoScore >= 80 ? "text-green-600" :
                    seoScore >= 60 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {seoScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      seoScore >= 80 ? "bg-green-500" :
                      seoScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${seoScore}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {seoScore >= 80 ? "Excellent! Your post is optimized for Pinterest." :
                   seoScore >= 60 ? "Good, but there's room for improvement." :
                   "Consider improving your title, description, and tags."}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Edit Panel */}
          <div className="w-96 p-6 overflow-auto">
            <div className="space-y-6">
              {/* Title Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                  <span className="text-gray-500 ml-1">({title.length}/{titleLimit})</span>
                </label>
                <textarea
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  maxLength={titleLimit}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Enter an engaging title..."
                />
                {title.length > titleLimit * 0.8 && (
                  <p className="text-xs text-yellow-600 mt-1">
                    Consider shortening your title for better mobile display
                  </p>
                )}
              </div>

              {/* Description Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                  <span className="text-gray-500 ml-1">({description.length}/{descriptionLimit})</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  maxLength={descriptionLimit}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Describe your content and include relevant keywords..."
                />
                <div className="mt-2 text-xs text-gray-600">
                  <div className="flex items-center mb-1">
                    <Hash className="h-3 w-3 mr-1" />
                    Hashtag suggestions: #pinterest #marketing #tips
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setShowImageUpload(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>

              {/* Source URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Article URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => {
                      setSourceUrl(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/article"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags ({tags.length}/10)
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Add a tag..."
                  />
                  <Button onClick={addTag} disabled={!newTag.trim() || tags.length >= 10}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-primary/70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Scheduling Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Scheduling</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Optimal Times */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Optimal Posting Times
                    </label>
                    <div className="space-y-2">
                      {optimalTimes.map((time, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setScheduleTime(time.time)}
                        >
                          <div>
                            <div className="text-sm font-medium">{time.time}</div>
                            <div className="text-xs text-gray-500">{time.label}</div>
                          </div>
                          <div className="text-sm font-medium text-green-600">{time.score}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Advanced Options
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pinterest Board
                      </label>
                      <select
                        value={boardSelection}
                        onChange={(e) => setBoardSelection(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {mockBoards.map((board) => (
                          <option key={board} value={board}>{board}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audience Targeting
                      </label>
                      <select
                        value={audienceTargeting}
                        onChange={(e) => setAudienceTargeting(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {audienceOptions.map((audience) => (
                          <option key={audience} value={audience}>{audience}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        A/B Test Title
                      </label>
                      <textarea
                        value={abTestTitle}
                        onChange={(e) => setAbTestTitle(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Alternative title for testing..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleSave('draft')}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave('schedule')}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleSave('publish')}>
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
