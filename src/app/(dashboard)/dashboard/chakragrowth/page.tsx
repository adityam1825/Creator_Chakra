"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Loader2, Sparkles, TrendingUp, Calendar, CheckCircle2, ArrowUpRight, RefreshCw, Target, Zap } from "lucide-react"
import { chakraGrowth, ChakraGrowthOutput } from "@/ai/flows/chakragrowth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts"

const priorityColors: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-100",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
  Low: "bg-green-50 text-green-700 border-green-100",
}

export default function ChakraGrowthPage() {
  const { toast } = useToast()
  const [niche, setNiche] = useState("")
  const [platform, setPlatform] = useState("Instagram")
  const [currentFollowers, setCurrentFollowers] = useState("")
  const [postsPerWeek, setPostsPerWeek] = useState("3")
  const [avgEngagementRate, setAvgEngagementRate] = useState("")
  const [biggestChallenge, setBiggestChallenge] = useState("")
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChakraGrowthOutput | null>(null)

  const handleAnalyze = async () => {
    if (!niche || !currentFollowers) { toast({ variant: "destructive", description: "Fill in your niche and follower count" }); return }
    setLoading(true)
    setResult(null)
    try {
      const output = await chakraGrowth({
        niche, platform, currentFollowers,
        postsPerWeek: parseInt(postsPerWeek) || 3,
        avgEngagementRate: avgEngagementRate || "3%",
        biggestChallenge: biggestChallenge || "Growing consistently",
        goal: goal || "Reach 1M followers",
      })
      setResult(output)
      toast({ title: "Growth plan ready!", description: "Your personalized strategy has been generated." })
    } catch {
      toast({ variant: "destructive", description: "Analysis failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const contentMixData = result ? [
    { name: "Educational", value: result.contentMix.educational, color: "#8B5CF6" },
    { name: "Entertaining", value: result.contentMix.entertaining, color: "#3B82F6" },
    { name: "Personal", value: result.contentMix.personal, color: "#EC4899" },
    { name: "Promotional", value: result.contentMix.promotional, color: "#F59E0B" },
  ] : []

  return (
    <div className="max-w-7xl mx-auto animate-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraGrowth</h1>
          <p className="text-sm text-gray-500">Personal Growth Tracker — Your AI-powered growth roadmap</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-gray-900">Your Creator Stats</CardTitle>
              <CardDescription className="text-xs text-gray-400">Tell us where you are to plan where you're going</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Niche</label>
                  <Input placeholder="e.g. Fitness" value={niche} onChange={e => setNiche(e.target.value)}
                    className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Instagram", "YouTube", "TikTok", "LinkedIn"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Followers</label>
                  <Input placeholder="e.g. 50K" value={currentFollowers} onChange={e => setCurrentFollowers(e.target.value)}
                    className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Posts/Week</label>
                  <Select value={postsPerWeek} onValueChange={setPostsPerWeek}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "7", "10+"].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Avg Engagement Rate</label>
                <Input placeholder="e.g. 4.5%" value={avgEngagementRate} onChange={e => setAvgEngagementRate(e.target.value)}
                  className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Biggest Challenge</label>
                <Textarea placeholder="e.g. Not getting enough views, inconsistent posting..." value={biggestChallenge} onChange={e => setBiggestChallenge(e.target.value)}
                  className="min-h-[70px] resize-none rounded-xl border-gray-200 bg-gray-50 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your Goal</label>
                <Input placeholder="e.g. Reach 1M followers in 6 months" value={goal} onChange={e => setGoal(e.target.value)}
                  className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm" />
              </div>
              <Button onClick={handleAnalyze} disabled={loading} className="w-full premium-button rounded-xl h-11 font-semibold text-sm">
                {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</span>
                  : <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" />Generate Growth Plan</span>}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-200">
                  <Rocket className="w-8 h-8 text-white animate-bounce" />
                </div>
                <p className="font-bold text-gray-900 text-lg">Building your growth roadmap...</p>
                <p className="text-gray-400 text-sm">Analyzing your metrics and creating a personalized strategy</p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-lg">Get your growth roadmap</p>
                  <p className="text-gray-400 text-sm mt-1">Fill in your stats to get a personalized AI growth plan</p>
                </div>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Score + Verdict */}
                <div className="p-5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">Growth Score</p>
                      <p className="text-5xl font-extrabold">{result.growthScore}<span className="text-2xl text-emerald-200">/100</span></p>
                      <p className="text-emerald-100 text-sm mt-1">{result.growthVerdict}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">Projected Growth</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-emerald-200">1 month</span>
                          <Badge className="bg-white/20 text-white border-0 text-xs">{result.projectedGrowth.oneMonth}</Badge>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-emerald-200">3 months</span>
                          <Badge className="bg-white/20 text-white border-0 text-xs">{result.projectedGrowth.threeMonths}</Badge>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-emerald-200">6 months</span>
                          <Badge className="bg-white/20 text-white border-0 text-xs">{result.projectedGrowth.sixMonths}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Insight */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Key Insight</span>
                  </div>
                  <p className="text-sm text-purple-800 leading-relaxed">{result.keyInsight}</p>
                </div>

                {/* Weekly Plan */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" /> 7-Day Action Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.weeklyPlan.map((day, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-gray-600">{day.day.slice(0, 3)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{day.action}</p>
                          <p className="text-xs text-gray-500">{day.contentType}</p>
                        </div>
                        <Badge className={cn("text-xs border shrink-0", priorityColors[day.priority])}>{day.priority}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-500" /> Top Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.topRecommendations.map((rec, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-xs font-bold text-gray-900 flex-1">{rec.recommendation}</p>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs shrink-0">{rec.impact}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>Effort: {rec.effort}</span>
                          <span>·</span>
                          <span>Timeline: {rec.timeframe}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Content Mix */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900">Recommended Content Mix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contentMixData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                          <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 11 }} formatter={(v: any) => [`${v}%`]} />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                            {contentMixData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" onClick={() => setResult(null)} className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Generate New Plan
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
