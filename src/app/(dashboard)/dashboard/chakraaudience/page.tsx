"use client"

import { motion } from "framer-motion"
import { PieChart, Users, Clock, Heart, TrendingUp, Eye, MapPin, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart as RechartsPie, Pie, Cell, BarChart, Bar
} from "recharts"

const ageData = [
  { name: "13–17", value: 8, color: "#E9D5FF" },
  { name: "18–24", value: 38, color: "#8B5CF6" },
  { name: "25–34", value: 42, color: "#6D28D9" },
  { name: "35–44", value: 9, color: "#A78BFA" },
  { name: "45+", value: 3, color: "#DDD6FE" },
]

const retentionData = [
  { second: "0s", rate: 100 },
  { second: "3s", rate: 82 },
  { second: "6s", rate: 71 },
  { second: "10s", rate: 64 },
  { second: "15s", rate: 58 },
  { second: "20s", rate: 52 },
  { second: "30s", rate: 44 },
]

const contentPrefs = [
  { type: "Workout Reels", score: 94, color: "bg-purple-500" },
  { type: "Nutrition Tips", score: 78, color: "bg-blue-500" },
  { type: "Transformation", score: 88, color: "bg-pink-500" },
  { type: "Motivation", score: 82, color: "bg-orange-500" },
  { type: "Behind the Scenes", score: 71, color: "bg-green-500" },
]

const topCities = [
  { city: "Mumbai", percent: 22 },
  { city: "Delhi", percent: 18 },
  { city: "Bangalore", percent: 15 },
  { city: "Hyderabad", percent: 11 },
  { city: "Chennai", percent: 8 },
]

const emotionalResponses = [
  { emotion: "Inspired", percent: 42, emoji: "✨" },
  { emotion: "Motivated", percent: 31, emoji: "💪" },
  { emotion: "Entertained", percent: 18, emoji: "😄" },
  { emotion: "Informed", percent: 9, emoji: "📚" },
]

export default function ChakraAudiencePage() {
  return (
    <div className="max-w-7xl mx-auto animate-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraAudience</h1>
          <p className="text-sm text-gray-500">AI Audience Intelligence — Understand who's watching you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age + Gender */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" /> Age & Gender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie data={ageData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {ageData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`]} contentStyle={{ borderRadius: "10px", fontSize: 12 }} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {ageData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-gray-900">{d.value}%</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-pink-50 rounded-xl text-center">
                <div className="text-xl font-bold text-pink-600">72%</div>
                <div className="text-xs text-gray-500">Female</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-center">
                <div className="text-xl font-bold text-blue-600">28%</div>
                <div className="text-xs text-gray-500">Male</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retention Curve */}
        <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" /> Audience Retention Curve
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">Average % of viewers still watching at each second</CardDescription>
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">Avg 18.4s watch time</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="second" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 12 }} formatter={(v: any) => [`${v}%`, "Retention"]} />
                <Area type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#retGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Preferences */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" /> Content Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contentPrefs.map((pref, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-600 w-32 shrink-0">{pref.type}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pref.score}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className={`h-2 rounded-full ${pref.color}`}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-8 text-right">{pref.score}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" /> Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCities.map((city, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-600 w-24 shrink-0">{city.city}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${city.percent * 4}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="h-2 rounded-full bg-green-500"
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-8 text-right">{city.percent}%</span>
              </div>
            ))}
            <div className="pt-2 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500"><span className="font-bold text-gray-700">India</span> accounts for 84% of your audience. Consider Hindi content for 3x reach.</p>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Response */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" /> Emotional Response
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">How your audience feels after watching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emotionalResponses.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                <span className="text-xl">{e.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">{e.emotion}</span>
                    <span className="text-xs font-bold text-purple-600">{e.percent}%</span>
                  </div>
                  <Progress value={e.percent} className="h-1.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device + Active Times */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-500" /> Device & Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-xl text-center">
                <div className="text-xl font-bold text-blue-600">94%</div>
                <div className="text-xs text-gray-500">Mobile</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <div className="text-xl font-bold text-gray-600">6%</div>
                <div className="text-xs text-gray-500">Desktop</div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Peak Activity Windows</p>
              {[
                { time: "6–8 AM", label: "Morning scroll", intensity: 65 },
                { time: "12–2 PM", label: "Lunch break", intensity: 72 },
                { time: "6–10 PM", label: "Evening prime", intensity: 96 },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-16 text-xs font-semibold text-gray-600">{t.time}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-purple-500" style={{ width: `${t.intensity}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{t.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
