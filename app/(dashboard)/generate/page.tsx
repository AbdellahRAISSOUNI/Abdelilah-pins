"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Upload, 
  Link as LinkIcon, 
  Settings, 
  Zap,
  Pin,
  Download,
  Eye,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function GeneratePostsPage() {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<Array<{id: number; title: string; image: string}>>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setGeneratedPosts([
        { id: 1, title: "10 Tips for Better Pinterest Posts", image: "/placeholder.jpg" },
        { id: 2, title: "Pinterest Marketing Strategy Guide", image: "/placeholder.jpg" },
        { id: 3, title: "How to Increase Pinterest Engagement", image: "/placeholder.jpg" },
      ]);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generate Posts</h1>
        <p className="mt-2 text-gray-600">
          Transform your blog content into viral Pinterest posts with AI-powered generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sitemap Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Source</h2>
            
            <div className="space-y-4">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sitemap URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="https://yourwebsite.com/sitemap.xml"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter your website&apos;s sitemap URL to automatically discover blog posts
                </p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Sitemap File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drop your sitemap.xml file here, or{" "}
                    <button className="text-primary hover:text-primary/80 font-medium">
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports XML files up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Advanced Options</h2>
              </div>
              {showAdvanced ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Posts
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>All posts</option>
                        <option>10 posts</option>
                        <option>25 posts</option>
                        <option>50 posts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content Category
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>All categories</option>
                        <option>Tutorials</option>
                        <option>How-to guides</option>
                        <option>Tips & tricks</option>
                        <option>Product reviews</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pinterest Style
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Modern", "Minimalist", "Bold", "Elegant"].map((style) => (
                        <button
                          key={style}
                          className="p-3 border border-gray-300 rounded-lg text-sm hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Button
              onClick={handleGenerate}
              disabled={!sitemapUrl || isGenerating}
              className="w-full py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Posts...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Pinterest Posts
                </>
              )}
            </Button>
            <p className="mt-3 text-sm text-gray-500 text-center">
              This process may take a few minutes depending on the number of posts
            </p>
          </div>
        </div>

        {/* Progress & Results */}
        <div className="space-y-6">
          {/* Progress Indicator */}
          {isGenerating && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Analyzing sitemap</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary animate-spin" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Generating posts</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Pin className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Creating images</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-gray-200 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Posts */}
          {generatedPosts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Generated Posts ({generatedPosts.length})
                </h3>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
              <div className="space-y-4">
                {generatedPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{post.title}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            Edit
                          </span>
                          <span className="flex items-center">
                            <Share2 className="h-3 w-3 mr-1" />
                            Schedule
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Pro Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use descriptive titles for better SEO</li>
                  <li>• Include relevant keywords in descriptions</li>
                  <li>• Schedule posts during peak hours (2-4 PM)</li>
                  <li>• Use high-quality, vertical images</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
