"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  TrendingUp, Users, Eye, Heart, Clock, ArrowUpRight, ArrowRight,
  Sparkles, Brain, Calendar, BarChart3, Flame, Zap, Play,
  Instagram, Youtube, Music2, Star, Target, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar
} from "recharts"

const growthData = [
  { day: "Mon", followers: 340200, reach: 82000, engagement: 4200 },
  { day: "Tue", followers: 341800, reach: 95000, engagement: 5100 },
  { day: "Wed", followers: 343500, reach: 110000, engagement: 6800 },
  { day: "Thu", followers: 344200, reach: 88000, engagement: 4900 },
  { day: "Fri", followers: 346100, reach: 142000, engagement: 9200 },
  { day: "Sat", followers: 348900, reach: 198000, engagement: 12400 },
  { day: "Sun", followers: 351200, reach: 176000, engagement: 10800 },
]

const viralScoreData = [
  { week: "W1", score: 62 },
  { week: "W2", score: 71 },
  { week: "W3", score: 68 },
  { week: "W4", score: 84 },
  { week: "W5", score: 79 },
  { week: "W6", score: 91 },
]

const topPosts = [
  { title: "5 Morning Habits That Changed My Life", views: "1.2M", likes: "84K", platform: "instagram", score: 94 },
  { title: "Full Body Workout in 15 Minutes", views: "890K", likes: "62K", platform: "youtube", score: 88 },
  { title: "What I Eat in a Day as a Fitness Creator", views: "654K", likes: "48K", platform: "instagram", score: 82 },
]

const aiInsights = [
  { icon: Flame, text: "Your audience is 3x more active on Saturdays 6–8 PM. Schedule your next reel then.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: TrendingUp, text: "\"Morning routine\" content is trending +240% in your niche this week. Create now.", color: "text-green-600", bg: "bg-green-50" },
  { icon: Target, text: "Your hook strength dropped 12% this week. Try opening with a bold question.", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Star, text: "You're eligible for brand deals in the ₹50K–₹2L range based on your engagement rate.", color: "text-purple-600", bg: "bg-purple-50" },
]

const demographics = [
  { label: "18–24", value: 38, color: "bg-purple-500" },
  { label: "25–34", value: 42, color: "bg-blue-500" },
  { label: "35–44", value: 14, color: "bg-violet-400" },
  { label: "45+", value: 6, color: "bg-gray-300" },
]

const bestTimes = [
  { day: "Mon", time: "7:00 PM", score: 78 },
  { day: "Wed", time: "6:30 PM", score: 82 },
  { day: "Fri", time: "8:00 PM", score: 88 },
  { day: "Sat", time: "6:00 PM", score: 96 },
  { day: "Sun", time: "7:30 PM", score: 91 },
]

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-purple-100">
            <AvatarImage src="https://picsum.photos/seed/creator1/48/48" />
            <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">PS</AvatarFallback>
          </Avatar>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Good morning, <span className="text-gradient">Priya</span> 👋
            </motion.h1>
            <p className="text-gray-500 text-sm mt-0.5">Fitness Creator · @priyacreates · 351K followers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-9 text-sm" asChild>
            <Link href="/dashboard/chakraflow">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Post
            </Link>
          </Button>
          <Button className="premium-button rounded-xl h-9 text-sm" asChild>
            <Link href="/dashboard/chakrabrain">
              <Brain className="w-4 h-4 mr-2" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Followers", value: "351.2K", change: "+10.8K", changeType: "up", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Total Reach", value: "892K", change: "+24%", changeType: "up", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Engagement Rate", value: "6.8%", change: "+1.2%", changeType: "up", icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Avg Watch Time", value: "18.4s", change: "+3.2s", changeType: "up", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <Badge className="bg-green-50 text-green-700 border-0 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">Audience Growth</CardTitle>
                <CardDescription className="text-xs text-gray-400 mt-0.5">Followers, reach & engagement this week</CardDescription>
              </div>
              <div className="flex gap-1">
                {["7D", "30D", "90D"].map((t, i) => (
                  <button key={t} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${i === 0 ? "bg-purple-50 text-purple-700" : "text-gray-400 hover:bg-gray-50"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                  formatter={(v: any) => [v >= 1000 ? `${(v/1000).toFixed(1)}K` : v]}
                />
                <Area type="monotone" dataKey="reach" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#reachGrad)" dot={false} />
                <Area type="monotone" dataKey="engagement" stroke="#3B82F6" strokeWidth={2.5} fill="url(#engGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Viral Score Trend */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-gray-900">Viral Score Trend</CardTitle>
            <CardDescription className="text-xs text-gray-400">Weekly content performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4 p-3 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>91</div>
                <div className="text-xs text-purple-600 font-semibold">This week's score</div>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-700 border-0 text-xs">+12 pts</Badge>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viralScoreData} margin={{ top: 0, right: 0, bottom: 0, left: -30 }}>
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} tickLine={false} axisLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: 11 }} />
                  <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights + Best Times + Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <Card className="lg:col-span-1 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">AI Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${insight.bg}`}>
                  <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Best Posting Times */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <CardTitle className="text-base font-bold text-gray-900">Best Posting Times</CardTitle>
              </div>
              <Link href="/dashboard/chakraflow" className="text-xs text-purple-600 font-semibold hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {bestTimes.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 text-xs font-bold text-gray-500">{t.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">{t.time}</span>
                    <span className="text-xs font-bold text-purple-600">{t.score}%</span>
                  </div>
                  <Progress value={t.score} className="h-1.5 bg-gray-100" />
                </div>
              </div>
            ))}
            <div className="pt-2">
              <div className="p-3 bg-purple-50 rounded-xl">
                <p className="text-xs text-purple-700 font-semibold">🔥 Best slot: Saturday 6:00 PM</p>
                <p className="text-xs text-purple-500 mt-0.5">96% engagement probability for fitness content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-pink-600" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">Audience Demographics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {demographics.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-semibold text-gray-500">{d.label}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.value}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                      className={`h-2 rounded-full ${d.color}`}
                    />
                  </div>
                  <div className="w-8 text-xs font-bold text-gray-700 text-right">{d.value}%</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <div className="text-lg font-bold text-gray-900">72%</div>
                <div className="text-xs text-gray-500">Female</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <div className="text-lg font-bold text-gray-900">India</div>
                <div className="text-xs text-gray-500">Top Country</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Posts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Posts */}
        <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">Top Performing Posts</CardTitle>
              <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">This month</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center shrink-0">
                  {post.platform === "instagram" ? <Instagram className="w-4 h-4 text-pink-500" /> : <Youtube className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{post.title}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-600">{post.score}</div>
                    <div className="text-xs text-gray-400">score</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { label: "Generate Reel Script", icon: Brain, href: "/dashboard/chakrabrain", color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
              { label: "Check Viral Score", icon: BarChart3, href: "/dashboard/chakrascore", color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
              { label: "View Trending Topics", icon: TrendingUp, href: "/dashboard/chakratrend", color: "bg-orange-50 text-orange-700 hover:bg-orange-100" },
              { label: "Schedule Content", icon: Calendar, href: "/dashboard/chakraflow", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
              { label: "Repurpose Content", icon: Zap, href: "/dashboard/chakramorph", color: "bg-pink-50 text-pink-700 hover:bg-pink-100" },
              { label: "Find Collaborators", icon: Users, href: "/dashboard/chakraconnect", color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" },
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${action.color}`}>
                  <action.icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-semibold">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
