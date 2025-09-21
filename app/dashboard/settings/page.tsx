"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Pin,
  Image as ImageIcon,
  Calendar,
  CreditCard, 
  Settings as SettingsIcon,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  Download,
  Plus,
  Edit,
  Save,
  Key
} from "lucide-react";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const tabs: TabConfig[] = [
  {
    id: "account",
    label: "Account",
    icon: <User className="h-4 w-4" />,
    description: "Profile and security settings"
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: <Pin className="h-4 w-4" />,
    description: "Pinterest integration settings"
  },
  {
    id: "content",
    label: "Content",
    icon: <ImageIcon className="h-4 w-4" />,
    description: "Content generation preferences"
  },
  {
    id: "scheduling",
    label: "Scheduling",
    icon: <Calendar className="h-4 w-4" />,
    description: "Posting schedule and timing"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    description: "Alert and notification preferences"
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCard className="h-4 w-4" />,
    description: "Subscription and payment settings"
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: <SettingsIcon className="h-4 w-4" />,
    description: "Advanced configuration options"
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  // const [pinterestConnected, setPinterestConnected] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    success: true,
    failure: true,
    weekly: true,
    monthly: false,
    performance: true
  });

  // Mock user data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://picsum.photos/100/100?random=user",
    plan: "Pro",
    usage: {
      posts: 156,
      limit: 1000,
      scheduled: 23,
      scheduledLimit: 500
    }
  };

  // Mock Pinterest account data
  const pinterestAccounts = [
    {
      id: 1,
      username: "johndoe_business",
      followers: 12500,
      boards: 24,
      connected: true,
      lastSync: "2 hours ago"
    },
    {
      id: 2,
      username: "johndoe_personal",
      followers: 3400,
      boards: 12,
      connected: false,
      lastSync: "Never"
    }
  ];

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and avatar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt="User profile avatar" 
                className="h-20 w-20 rounded-full object-cover"
              />
              <Button size="sm" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0">
                <Upload className="h-3 w-3" />
              </Button>
            </div>
      <div>
              <h3 className="text-lg font-medium">{userProfile.name}</h3>
              <p className="text-gray-500">{userProfile.email}</p>
              <Badge variant="secondary" className="mt-1">{userProfile.plan} Plan</Badge>
      </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userProfile.name} />
                    </div>
                    <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={userProfile.email} />
                    </div>
                  </div>

                    <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself..."
              defaultValue="Pinterest marketing specialist helping businesses grow their online presence."
                      />
                    </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
                    <div>
            <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
              <Input 
                id="current-password" 
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
                      </div>
                    </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
                      </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>

          <div className="flex items-center space-x-2">
            <Switch id="2fa" />
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>Export your account data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Export Account Data</h4>
              <p className="text-sm text-gray-500">Download all your posts, analytics, and settings</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
                    </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPinterestTab = () => (
    <div className="space-y-6">
      {/* Pinterest Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Pinterest Integration</CardTitle>
          <CardDescription>Manage your connected Pinterest accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pinterestAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Pin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium">@{account.username}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{account.followers.toLocaleString()} followers</span>
                    <span>{account.boards} boards</span>
                    <span>Last sync: {account.lastSync}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {account.connected ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary">Disconnected</Badge>
                )}
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                        </div>
                      </div>
          ))}
          
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Connect Another Pinterest Account
          </Button>
        </CardContent>
      </Card>

      {/* Board Management */}
      <Card>
        <CardHeader>
          <CardTitle>Board Management</CardTitle>
          <CardDescription>Select default boards for posting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
              <Label htmlFor="default-board">Default Board</Label>
              <Select defaultValue="marketing-tips">
                <SelectTrigger>
                  <SelectValue placeholder="Select default board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing-tips">Marketing Tips</SelectItem>
                  <SelectItem value="seo-strategies">SEO Strategies</SelectItem>
                  <SelectItem value="design-inspiration">Design Inspiration</SelectItem>
                  <SelectItem value="content-ideas">Content Ideas</SelectItem>
                </SelectContent>
              </Select>
                      </div>
                      <div>
              <Label htmlFor="auto-board">Auto Board Selection</Label>
              <Select defaultValue="enabled">
                <SelectTrigger>
                  <SelectValue placeholder="Auto board selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
                    </div>
                  </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      {/* Default Post Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Default Post Settings</CardTitle>
          <CardDescription>Configure default settings for generated posts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
              <Label htmlFor="image-style">Default Image Style</Label>
              <Select defaultValue="modern">
                <SelectTrigger>
                  <SelectValue placeholder="Select image style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
                      </div>
            <div>
              <Label htmlFor="image-size">Default Image Size</Label>
              <Select defaultValue="1000x1500">
                <SelectTrigger>
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000x1500">1000x1500 (Pinterest)</SelectItem>
                  <SelectItem value="1080x1080">1080x1080 (Square)</SelectItem>
                  <SelectItem value="1200x628">1200x628 (Landscape)</SelectItem>
                </SelectContent>
              </Select>
                    </div>
                  </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="content-tone">Content Tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger>
                  <SelectValue placeholder="Select content tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                </SelectContent>
              </Select>
                          </div>
                          <div>
              <Label htmlFor="language">Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
                          </div>
                        </div>
        </CardContent>
      </Card>

      {/* Quality Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Filters</CardTitle>
          <CardDescription>Set quality thresholds for generated content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="quality-threshold">Minimum Quality Score</Label>
              <span className="text-sm text-gray-500">75%</span>
            </div>
            <input 
              type="range" 
              id="quality-threshold" 
              min="50" 
              max="100" 
              defaultValue="75"
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-filter">Auto-filter Low Quality Posts</Label>
            <Switch id="auto-filter" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSchedulingTab = () => (
    <div className="space-y-6">
      {/* Default Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduling Preferences</CardTitle>
          <CardDescription>Configure default scheduling settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Default Timezone</Label>
              <Select defaultValue="est">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                </SelectContent>
              </Select>
                      </div>
            <div>
              <Label htmlFor="frequency">Posting Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
                    </div>
                  </div>
          
          <div>
            <Label>Preferred Posting Times</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <input type="checkbox" id={time} defaultChecked />
                  <Label htmlFor={time} className="text-sm">{time}</Label>
                </div>
              ))}
                </div>
              </div>
        </CardContent>
      </Card>

      {/* Auto-scheduling Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-scheduling Rules</CardTitle>
          <CardDescription>Configure automatic scheduling behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
              <Label htmlFor="auto-schedule">Enable Auto-scheduling</Label>
              <p className="text-sm text-gray-500">Automatically schedule posts at optimal times</p>
                      </div>
            <Switch id="auto-schedule" defaultChecked />
                    </div>
          
                    <div className="flex items-center justify-between">
                      <div>
              <Label htmlFor="weekend-posting">Weekend Posting</Label>
              <p className="text-sm text-gray-500">Allow posts on weekends</p>
                      </div>
            <Switch id="weekend-posting" />
                    </div>
          
                    <div className="flex items-center justify-between">
                      <div>
              <Label htmlFor="holiday-posting">Holiday Posting</Label>
              <p className="text-sm text-gray-500">Allow posts during holidays</p>
            </div>
            <Switch id="holiday-posting" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label htmlFor={key} className="capitalize">
                  {key === 'weekly' ? 'Weekly Reports' : 
                   key === 'monthly' ? 'Monthly Reports' :
                   key === 'performance' ? 'Performance Alerts' :
                   key === 'email' ? 'Email Notifications' :
                   key === 'browser' ? 'Browser Notifications' :
                   key === 'success' ? 'Success Notifications' :
                   key === 'failure' ? 'Failure Notifications' : key}
                </Label>
                <p className="text-sm text-gray-500">
                  {key === 'email' ? 'Receive notifications via email' :
                   key === 'browser' ? 'Show browser notifications' :
                   key === 'success' ? 'Notify when posts are successful' :
                   key === 'failure' ? 'Notify when posts fail' :
                   key === 'weekly' ? 'Send weekly performance reports' :
                   key === 'monthly' ? 'Send monthly performance reports' :
                   key === 'performance' ? 'Alert when performance drops' : ''}
                </p>
              </div>
              <Switch 
                id={key} 
                checked={value}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [key]: checked }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your subscription and usage details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-lg font-medium">Pro Plan</h3>
              <p className="text-gray-500">$29/month • Billed monthly</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Posts Generated</span>
                <span className="text-sm text-gray-500">{userProfile.usage.posts}/{userProfile.usage.limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(userProfile.usage.posts / userProfile.usage.limit) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Scheduled Posts</span>
                <span className="text-sm text-gray-500">{userProfile.usage.scheduled}/{userProfile.usage.scheduledLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(userProfile.usage.scheduled / userProfile.usage.scheduledLimit) * 100}%` }}
                ></div>
                      </div>
                    </div>
                  </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', amount: '$29.00', status: 'Paid', invoice: 'INV-001' },
              { date: '2023-12-15', amount: '$29.00', status: 'Paid', invoice: 'INV-002' },
              { date: '2023-11-15', amount: '$29.00', status: 'Paid', invoice: 'INV-003' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-gray-500">Invoice {invoice.invoice}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{invoice.amount}</span>
                  <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Upgrade */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Plan</CardTitle>
          <CardDescription>Unlock more features with a higher plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Enterprise</h4>
              <p className="text-2xl font-bold mt-2">$99/month</p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1">
                <li>• Unlimited posts</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
                <li>• Custom integrations</li>
              </ul>
              <Button className="w-full mt-4">Upgrade to Enterprise</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      {/* API Access */}
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage your API tokens and integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">API Token</span>
              <Button variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                Generate New Token
              </Button>
            </div>
            <p className="text-sm text-gray-500">Use your API token to integrate with external tools</p>
            <div className="mt-2 p-2 bg-white border rounded font-mono text-sm">
              pk_live_••••••••••••••••••••••••••••••••
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>Configure webhooks for real-time updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input 
              id="webhook-url" 
              placeholder="https://your-domain.com/webhook"
              defaultValue="https://api.example.com/webhook"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="webhook-enabled">Enable Webhooks</Label>
            <Switch id="webhook-enabled" />
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
          <CardDescription>Configure how long to keep your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="retention-period">Data Retention Period</Label>
            <Select defaultValue="2-years">
              <SelectTrigger>
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-year">1 Year</SelectItem>
                <SelectItem value="2-years">2 Years</SelectItem>
                <SelectItem value="5-years">5 Years</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
                  </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-delete">Auto-delete Old Data</Label>
            <Switch id="auto-delete" />
                </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Permanently delete your account and all data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-800">Delete Account</h4>
                <p className="text-sm text-red-600">This action cannot be undone. All your data will be permanently deleted.</p>
              </div>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountTab();
      case "pinterest":
        return renderPinterestTab();
      case "content":
        return renderContentTab();
      case "scheduling":
        return renderSchedulingTab();
      case "notifications":
        return renderNotificationsTab();
      case "billing":
        return renderBillingTab();
      case "advanced":
        return renderAdvancedTab();
      default:
        return renderAccountTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
        </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}