"use client"

import { useState } from "react"
import { Settings, User, Bell, Shield, Palette, CreditCard, LogOut, ChevronRight, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
]

export default function SettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("profile")
  const [name, setName] = useState("Priya Sharma")
  const [handle, setHandle] = useState("@priyacreates")
  const [niche, setNiche] = useState("Fitness")
  const [bio, setBio] = useState("Fitness creator helping women build strength & confidence 💪")
  const [notifications, setNotifications] = useState({ trends: true, schedule: true, score: false, collab: true })

  const handleSave = () => {
    toast({ title: "Settings saved!", description: "Your profile has been updated." })
  }

  return (
    <div className="max-w-4xl mx-auto animate-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg shadow-gray-200">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Settings</h1>
          <p className="text-sm text-gray-500">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardContent className="p-3 space-y-1">
              {settingsSections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === s.id ? "bg-purple-50 text-purple-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <s.icon className="w-4 h-4 shrink-0" />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <button onClick={() => router.push("/login")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-4">
          {activeSection === "profile" && (
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900">Profile Settings</CardTitle>
                <CardDescription className="text-xs text-gray-400">Update your creator profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-100">
                    <AvatarImage src="https://picsum.photos/seed/creator1/64/64" />
                    <AvatarFallback className="bg-purple-100 text-purple-700 font-bold text-lg">PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-sm h-8">Change Photo</Button>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Handle</Label>
                    <Input value={handle} onChange={e => setHandle(e.target.value)} className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Niche</Label>
                  <Input value={niche} onChange={e => setNiche(e.target.value)} className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Bio</Label>
                  <Input value={bio} onChange={e => setBio(e.target.value)} className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                </div>
                <div className="pt-2 flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div>
                    <p className="text-sm font-bold text-purple-900">Creator Plan</p>
                    <p className="text-xs text-purple-600">Unlimited generations · All features</p>
                  </div>
                  <Badge className="bg-purple-600 text-white border-0 text-xs px-3 py-1">Active</Badge>
                </div>
                <Button onClick={handleSave} className="premium-button rounded-xl h-10 px-6 font-semibold text-sm">
                  <Check className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "trends", label: "Trending Alerts", desc: "Get notified when a trend matches your niche" },
                  { key: "schedule", label: "Posting Reminders", desc: "Reminders for your scheduled content" },
                  { key: "score", label: "Score Updates", desc: "When your viral score changes significantly" },
                  { key: "collab", label: "Collab Matches", desc: "New collaboration opportunities found" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{n.label}</p>
                      <p className="text-xs text-gray-500">{n.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[n.key as keyof typeof notifications]}
                      onCheckedChange={v => setNotifications(prev => ({ ...prev, [n.key]: v }))}
                    />
                  </div>
                ))}
                <Button onClick={handleSave} className="premium-button rounded-xl h-10 px-6 font-semibold text-sm">
                  <Check className="w-4 h-4 mr-2" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "billing" && (
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900">Billing & Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-xs font-bold uppercase tracking-wider">Current Plan</p>
                      <p className="text-2xl font-bold mt-1">Creator Plan</p>
                      <p className="text-purple-200 text-sm">₹999/month · Renews June 21, 2026</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1.5">Active</Badge>
                  </div>
                </div>
                {["Unlimited AI generations", "All Chakra features", "Priority support", "Advanced analytics"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="rounded-xl border-gray-200 text-sm h-10">Manage Billing</Button>
                  <Button variant="outline" className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-sm h-10">Cancel Plan</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "privacy" && (
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-gray-900">Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security", enabled: false },
                  { label: "Profile Visibility", desc: "Allow other creators to find your profile", enabled: true },
                  { label: "Analytics Sharing", desc: "Share anonymized data to improve AI", enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
                <Button variant="outline" className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-sm h-10 w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
