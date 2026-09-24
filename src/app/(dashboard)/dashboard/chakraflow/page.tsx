"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar, Clock, Plus, Flame, Instagram, Youtube, Music2,
  Linkedin, Twitter, Sparkles, CheckCircle2, ArrowRight, BarChart3
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const schedule = [
  { day: "Mon", date: "19", slots: [{ time: "7:00 PM", platform: "instagram", topic: "Morning Routine Reel", type: "Reel", score: 88 }] },
  { day: "Tue", date: "20", slots: [] },
  { day: "Wed", date: "21", slots: [{ time: "6:30 PM", platform: "youtube", topic: "Full Body Workout", type: "Short", score: 82 }] },
  { day: "Thu", date: "22", slots: [] },
  { day: "Fri", date: "23", slots: [{ time: "8:00 PM", platform: "instagram", topic: "What I Eat in a Day", type: "Reel", score: 91 }] },
  { day: "Sat", date: "24", slots: [{ time: "6:00 PM", platform: "instagram", topic: "Transformation Story", type: "Reel", score: 96 }, { time: "8:30 PM", platform: "twitter", topic: "Fitness Myth Thread", type: "Thread", score: 74 }] },
  { day: "Sun", date: "25", slots: [{ time: "7:30 PM", platform: "instagram", topic: "Weekly Recap Story", type: "Story", score: 79 }] },
]

const aiRecommendations = [
  { platform: "Instagram", time: "6:00 PM", day: "Saturday", reason: "Peak engagement for fitness content — 96% probability", score: 96, icon: Instagram, color: "text-pink-500", bg: "bg-pink-50" },
  { platform: "Instagram", time: "7:00 PM", day: "Monday", reason: "High motivation energy on Mondays — audience is receptive", score: 88, icon: Instagram, color: "text-pink-500", bg: "bg-pink-50" },
  { platform: "YouTube", time: "6:30 PM", day: "Wednesday", reason: "Mid-week workout content performs 3x better", score: 82, icon: Youtube, color: "text-red-500", bg: "bg-red-50" },
  { platform: "Twitter", time: "9:00 AM", day: "Tuesday", reason: "Fitness tips get max impressions on Tuesday mornings", score: 77, icon: Twitter, color: "text-blue-500", bg: "bg-blue-50" },
]

const categorySchedule = [
  { category: "Workout Reels", bestTime: "6–8 PM", bestDays: "Mon, Wed, Fri, Sat", avgScore: 89, color: "bg-purple-500" },
  { category: "Nutrition Content", bestTime: "12–1 PM", bestDays: "Tue, Thu", avgScore: 76, color: "bg-green-500" },
  { category: "Motivational", bestTime: "7–9 AM", bestDays: "Mon, Wed", avgScore: 83, color: "bg-orange-500" },
  { category: "Transformation", bestTime: "7–9 PM", bestDays: "Fri, Sat", avgScore: 94, color: "bg-pink-500" },
]

const heatmapHours = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"]
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const heatmapValues = [
  [0.2, 0.3, 0.4, 0.3, 0.5, 0.8, 0.6],
  [0.3, 0.4, 0.5, 0.4, 0.6, 0.7, 0.5],
  [0.4, 0.5, 0.6, 0.5, 0.7, 0.9, 0.7],
  [0.3, 0.4, 0.5, 0.4, 0.6, 0.8, 0.6],
  [0.5, 0.6, 0.7, 0.6, 0.8, 1.0, 0.8],
  [0.4, 0.5, 0.6, 0.5, 0.7, 0.9, 0.7],
]

function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  const cls = cn("w-3.5 h-3.5", className)
  switch (platform) {
    case "instagram": return <Instagram className={cn(cls, "text-pink-500")} />
    case "youtube": return <Youtube className={cn(cls, "text-red-500")} />
    case "twitter": return <Twitter className={cn(cls, "text-blue-500")} />
    case "tiktok": return <Music2 className={cn(cls, "text-gray-800")} />
    default: return <Instagram className={cls} />
  }
}

export default function ChakraFlowPage() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [consistency, setConsistency] = useState(72)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="max-w-7xl mx-auto animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraFlow</h1>
            <p className="text-sm text-gray-500">Smart AI Scheduling — Post at the perfect time, every time</p>
          </div>
        </div>
        <Button className="premium-button rounded-xl h-9 text-sm" onClick={() => toast({ title: "Post scheduled!", description: "Added to your content calendar." })}>
          <Plus className="w-4 h-4 mr-2" /> Schedule Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Calendar */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">Weekly Content Calendar</CardTitle>
                <CardDescription className="text-xs text-gray-400">May 19–25, 2026</CardDescription>
              </div>
              <div className="flex gap-1">
                {["Week", "Month"].map((v, i) => (
                  <button key={v} className={cn("px-3 py-1 rounded-lg text-xs font-semibold transition-all", i === 0 ? "bg-purple-50 text-purple-700" : "text-gray-400 hover:bg-gray-50")}>
                    {v}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-t border-gray-100">
                {schedule.map((day, i) => (
                  <div key={i} className="border-r border-gray-100 last:border-r-0 flex flex-col min-h-[200px]">
                    <div className="p-2 text-center border-b border-gray-100 bg-gray-50">
                      <div className="text-xs font-bold text-gray-400 uppercase">{day.day}</div>
                      <div className={cn("text-lg font-bold mt-0.5", day.slots.length > 0 ? "text-purple-600" : "text-gray-400")}>
                        {day.date}
                      </div>
                    </div>
                    <div className="flex-1 p-1.5 space-y-1.5 overflow-y-auto">
                      {day.slots.map((slot, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ scale: 1.02 }}
                          className="p-1.5 rounded-lg bg-purple-50 border border-purple-100 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] font-bold text-purple-600">{slot.time}</span>
                            <PlatformIcon platform={slot.platform} />
                          </div>
                          <p className="text-[10px] text-gray-700 font-medium leading-tight truncate">{slot.topic}</p>
                          <Badge className="mt-1 bg-white text-purple-600 border-purple-100 text-[9px] px-1.5 py-0">{slot.type}</Badge>
                        </motion.div>
                      ))}
                      {day.slots.length === 0 && (
                        <button
                          onClick={() => toast({ description: `Slot added for ${day.day}` })}
                          className="w-full h-8 border border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all group"
                        >
                          <Plus className="w-3 h-3 text-gray-300 group-hover:text-purple-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Heatmap */}
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-gray-900">Audience Activity Heatmap</CardTitle>
              <CardDescription className="text-xs text-gray-400">When your followers are most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-8 gap-1 mb-1">
                  <div />
                  {heatmapDays.map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-400">{d}</div>
                  ))}
                </div>
                {heatmapValues.map((row, i) => (
                  <div key={i} className="grid grid-cols-8 gap-1">
                    <div className="text-xs text-gray-400 font-medium flex items-center">{heatmapHours[i]}</div>
                    {row.map((val, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (i * 7 + j) * 0.01 }}
                        className="h-8 rounded-lg"
                        style={{
                          backgroundColor: val > 0.8 ? "#8B5CF6" : val > 0.6 ? "#A78BFA" : val > 0.4 ? "#DDD6FE" : val > 0.2 ? "#EDE9FE" : "#F5F3FF",
                        }}
                        title={`${heatmapDays[j]} ${heatmapHours[i]}: ${Math.round(val * 100)}% activity`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 justify-end">
                <span className="text-xs text-gray-400">Low</span>
                {["#F5F3FF", "#EDE9FE", "#DDD6FE", "#A78BFA", "#8B5CF6"].map((c, i) => (
                  <div key={i} className="w-5 h-3 rounded" style={{ backgroundColor: c }} />
                ))}
                <span className="text-xs text-gray-400">High</span>
              </div>
            </CardContent>
          </Card>

          {/* Category Schedule */}
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-gray-900">Category-Based Schedule</CardTitle>
              <CardDescription className="text-xs text-gray-400">Best times by content type for your niche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorySchedule.map((cat, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-2 h-10 rounded-full ${cat.color} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">{cat.category}</span>
                      <Badge className="bg-white text-purple-600 border-purple-100 text-xs">{cat.avgScore}% avg score</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cat.bestTime}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{cat.bestDays}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Consistency Tracker */}
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" /> Posting Consistency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{consistency}%</span>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 text-xs">Needs Improvement</Badge>
              </div>
              <Progress value={consistency} className="h-2 mb-3" />
              <p className="text-xs text-gray-500 leading-relaxed">You've posted 5 out of 7 planned days this week. Consistent posting increases reach by up to 40%.</p>
              <div className="flex gap-1.5 mt-3">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className={cn("flex-1 h-6 rounded-md flex items-center justify-center text-xs font-bold",
                    [0, 2, 4, 5, 6].includes(i) ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-400"
                  )}>
                    {d}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <CardTitle className="text-sm font-bold text-gray-900">AI Posting Slots</CardTitle>
              </div>
              <CardDescription className="text-xs text-gray-400">Best times for your audience this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${rec.bg}`}>
                        <rec.icon className={`w-3.5 h-3.5 ${rec.color}`} />
                      </div>
                      <span className="text-xs font-bold text-gray-900">{rec.platform}</span>
                    </div>
                    <Badge className="bg-purple-50 text-purple-700 border-0 text-xs font-bold">{rec.score}%</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-700">{rec.time} · {rec.day}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{rec.reason}</p>
                  <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-purple-600 hover:bg-purple-50 rounded-lg"
                    onClick={() => toast({ description: `Slot reserved for ${rec.day} ${rec.time}` })}>
                    Reserve Slot <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pro Tip */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">ChakraFlow Insight</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Creators who post consistently at the same time each week see <strong className="text-purple-700">2.3x higher follower growth</strong> than those who post randomly. Your best window is <strong className="text-purple-700">Saturday 6 PM</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
