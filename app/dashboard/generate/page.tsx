"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Link as LinkIcon, 
  Zap,
  Pin,
  Download,
  Eye,
  Share2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  X,
  RotateCcw,
  Sparkles,
  TrendingUp,
  FileText,
  Sliders
} from "lucide-react";

interface GeneratedPost {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  status: 'success' | 'failed';
}

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
}

export default function GeneratePostsPage() {
  // Main state
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Advanced options
  const [postCount, setPostCount] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageStyle, setImageStyle] = useState("modern");
  const [language, setLanguage] = useState("en");

  // Processing steps
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: 'analyze', name: 'Analyzing sitemap...', status: 'pending', progress: 0 },
    { id: 'extract', name: 'Extracting articles...', status: 'pending', progress: 0 },
    { id: 'generate', name: 'Generating content...', status: 'pending', progress: 0 },
    { id: 'images', name: 'Creating images...', status: 'pending', progress: 0 },
  ]);

  // Mock data
  const sampleSitemaps = [
    "https://example-blog.com/sitemap.xml",
    "https://tech-news.com/sitemap_index.xml",
    "https://lifestyle-blog.net/sitemap.xml"
  ];

  const categories = [
    "Tutorials", "How-to guides", "Tips & tricks", "Product reviews", 
    "News", "Entertainment", "Lifestyle", "Technology"
  ];

  const imageStyles = [
    { value: "modern", label: "Modern", description: "Clean and contemporary" },
    { value: "minimalist", label: "Minimalist", description: "Simple and elegant" },
    { value: "bold", label: "Bold", description: "Vibrant and eye-catching" },
    { value: "elegant", label: "Elegant", description: "Sophisticated and refined" }
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" }
  ];

  // URL validation
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.includes('sitemap') || url.includes('xml');
    } catch {
      return false;
    }
  };

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Mock article generation
  const generateMockPosts = (count: number): GeneratedPost[] => {
    const mockTitles = [
      "10 Essential Tips for Better Pinterest Marketing",
      "How to Create Viral Pinterest Content in 2024",
      "Pinterest SEO: Complete Guide for Bloggers",
      "Design Trends That Will Dominate Pinterest This Year",
      "The Psychology Behind Pinterest User Behavior",
      "Pinterest Analytics: What Metrics Actually Matter",
      "Creating Seasonal Content That Performs",
      "Pinterest vs Instagram: Which Platform is Better?",
      "Advanced Pinterest Automation Strategies",
      "Building a Pinterest Community: Best Practices"
    ];

    const mockCategories = ["Tutorials", "Marketing", "SEO", "Design", "Analytics"];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: mockTitles[i % mockTitles.length],
      description: `A comprehensive guide covering all aspects of ${mockTitles[i % mockTitles.length].toLowerCase()}. Perfect for beginners and advanced users alike.`,
      image: `/placeholder-${(i % 5) + 1}.jpg`,
      url: `https://example.com/post-${i + 1}`,
      category: mockCategories[i % mockCategories.length],
      status: Math.random() > 0.1 ? 'success' : 'failed'
    }));
  };

  // Simulate processing
  const simulateProcessing = async () => {
    setIsGenerating(true);
    // setCurrentStep(0);
    setProgress(0);
    setEstimatedTime(120); // 2 minutes

    // Reset steps
    setProcessingSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })));

    // Step 1: Analyze sitemap
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'analyze' ? { ...step, status: 'processing' } : step
    ));
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'analyze' ? { ...step, progress: i } : step
      ));
    }

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'analyze' ? { ...step, status: 'completed', progress: 100 } : step
    ));
    // setCurrentStep(1);

    // Step 2: Extract articles
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'extract' ? { ...step, status: 'processing' } : step
    ));
    
    for (let i = 0; i <= 100; i += 15) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'extract' ? { ...step, progress: i } : step
      ));
    }

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'extract' ? { ...step, status: 'completed', progress: 100 } : step
    ));
    // setCurrentStep(2);

    // Step 3: Generate content
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'generate' ? { ...step, status: 'processing' } : step
    ));
    
    for (let i = 0; i <= 100; i += 8) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'generate' ? { ...step, progress: i } : step
      ));
    }

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'generate' ? { ...step, status: 'completed', progress: 100 } : step
    ));
    // setCurrentStep(3);

    // Step 4: Create images
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'images' ? { ...step, status: 'processing' } : step
    ));
    
    for (let i = 0; i <= 100; i += 12) {
      await new Promise(resolve => setTimeout(resolve, 250));
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'images' ? { ...step, progress: i } : step
      ));
    }

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'images' ? { ...step, status: 'completed', progress: 100 } : step
    ));

    // Generate results
    const posts = generateMockPosts(postCount);
    setGeneratedPosts(posts);
    setIsGenerating(false);
    setShowResults(true);
    setProgress(100);
  };

  // Handle analyze sitemap
  const handleAnalyze = async () => {
    if (!isValidUrl(sitemapUrl)) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  // Handle generation start
  const handleGenerate = async () => {
    if (!isValidUrl(sitemapUrl)) return;
    await simulateProcessing();
  };

  // Reset process
  const resetProcess = () => {
    setIsGenerating(false);
    setShowResults(false);
    setGeneratedPosts([]);
    // setCurrentStep(0);
    setProgress(0);
    setEstimatedTime(0);
    setProcessingSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })));
  };

  // Calculate success rate
  const successRate = generatedPosts.length > 0 
    ? Math.round((generatedPosts.filter(p => p.status === 'success').length / generatedPosts.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Pinterest Posts</h1>
        <p className="text-lg text-gray-600">
          Transform your blog content into viral Pinterest posts with AI-powered generation
        </p>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            !isGenerating && !showResults ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <span className="text-sm font-medium">Input</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            isGenerating ? 'bg-primary text-white' : showResults ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <span className="text-sm font-medium">Processing</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            showResults ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="w-6 h-6 bg-current rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <span className="text-sm font-medium">Results</span>
          </div>
        </div>
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* URL Input */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LinkIcon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Your Sitemap URL</h2>
                <p className="text-gray-600">
                  Provide your website&apos;s sitemap URL to automatically discover and process blog posts
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="https://yourblog.com/sitemap.xml"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* Sample URLs */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Try these sample URLs:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleSitemaps.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setSitemapUrl(url)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {url}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!isValidUrl(sitemapUrl) || isAnalyzing}
                    variant="outline"
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Analyze Sitemap
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={!isValidUrl(sitemapUrl) || isGenerating}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Posts
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Sliders className="h-5 w-5 text-gray-400" />
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
                  <div className="space-y-6 pt-6">
                    {/* Post Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Number of Posts: {postCount}
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={postCount}
                        onChange={(e) => setPostCount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5 posts</span>
                        <span>100 posts</span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Content Categories
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Image Style */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Image Style
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {imageStyles.map((style) => (
                          <button
                            key={style.value}
                            onClick={() => setImageStyle(style.value)}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              imageStyle === style.value
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="font-medium text-sm">{style.label}</div>
                            <div className="text-xs text-gray-500">{style.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Panel */}
          <div className="space-y-6">
            {isGenerating && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
                  <Button
                    onClick={resetProcess}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>

                {/* Overall Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Estimated time remaining: {Math.max(0, Math.ceil(estimatedTime - (progress * estimatedTime / 100)))}s
                  </p>
                </div>

                {/* Processing Steps */}
                <div className="space-y-4">
                  {processingSteps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {step.status === 'completed' ? (
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ) : step.status === 'processing' ? (
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.status === 'completed' ? 'text-green-600' : 
                          step.status === 'processing' ? 'text-primary' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </p>
                        {step.status === 'processing' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Pro Tips</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use descriptive titles for better SEO</li>
                    <li>• Include relevant keywords in descriptions</li>
                    <li>• Schedule posts during peak hours (2-4 PM)</li>
                    <li>• Use high-quality, vertical images</li>
                    <li>• Test different styles to see what works</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Success! Generated {generatedPosts.length} Pinterest Posts
            </h2>
            <p className="text-green-700">
              Your content has been transformed into engaging Pinterest posts ready for publishing
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{generatedPosts.length}</div>
              <div className="text-sm text-gray-600">Posts Created</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2m 34s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Eye className="h-5 w-5 mr-2" />
              View All Posts
            </Button>
            <Button variant="outline" size="lg" onClick={resetProcess}>
              <RotateCcw className="h-5 w-5 mr-2" />
              Generate More Posts
            </Button>
            <Button variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Export Results
            </Button>
          </div>

          {/* Generated Posts Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Generated Posts Preview</h3>
              <span className="text-sm text-gray-500">
                {generatedPosts.filter(p => p.status === 'success').length} of {generatedPosts.length} successful
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedPosts.slice(0, 6).map((post) => (
                <div key={post.id} className={`border rounded-lg p-4 ${
                  post.status === 'success' ? 'border-gray-200 hover:shadow-sm' : 'border-red-200 bg-red-50'
                } transition-shadow`}>
                  <div className="flex items-start space-x-3">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      post.status === 'success' 
                        ? 'bg-gradient-to-br from-primary/20 to-primary/10' 
                        : 'bg-red-100'
                    }`}>
                      {post.status === 'success' ? (
                        <Pin className="h-6 w-6 text-primary" />
                      ) : (
                        <X className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{post.category}</p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Share2 className="h-3 w-3 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {generatedPosts.length > 6 && (
              <div className="text-center mt-4">
                <Button variant="outline">
                  View All {generatedPosts.length} Posts
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
