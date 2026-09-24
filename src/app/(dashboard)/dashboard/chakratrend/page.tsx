"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp, Flame, Music2, Hash, Loader2, RefreshCw,
  Sparkles, ArrowUpRight, Zap, Clock, Instagram, Youtube,
  ChevronRight, AlertCircle
} from "lucide-react"
import { chakraTrend, ChakraTrendOutput } from "@/ai/flows/chakratrend"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Link from "next/link"

const urgencyColors: Record<string, string> = {
  "Post Now": "bg-red-50 text-red-700 border-red-100",
  "Post This Week": "bg-orange-50 text-orange-700 border-orange-100",
  "Plan Ahead": "bg-blue-50 text-blue-700 border-blue-100",
}

export default function ChakraTrendPage() {
  const { toast } = useToast()
  const [niche, setNiche] = useState("")
  const [platform, setPlatform] = useState<any>("Instagram")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChakraTrendOutput | null>(null)

  const handleFetch = async () => {
    if (!niche.trim()) { toast({ variant: "destructive", description: "Enter your niche first" }); return }
    setLoading(true)
    setResult(null)
    try {
      const output = await chakraTrend({ niche, platform })
      setResult(output)
      toast({ title: "Trends loaded!", description: `Found ${output.topTrends.length} trending topics for ${niche}` })
    } catch {
      toast({ variant: "destructive", title: "Failed to fetch trends", description: "Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto animate-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraTrend</h1>
          <p className="text-sm text-gray-500">Real-time trend intelligence — Never miss a viral wave</p>
        </div>
        <Badge className="ml-auto bg-red-50 text-red-600 border-red-100 text-xs font-semibold px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1.5 animate-pulse" />
          Live
        </Badge>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter your niche (e.g. Fitness, Dance, Tech, Food...)"
              value={niche}
              onChange={e => setNiche(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleFetch()}
              className="flex-1 h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
            />
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl border-gray-200 bg-gray-50 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Instagram", "YouTube", "TikTok", "All Platforms"].map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleFetch} disabled={loading} className="premium-button rounded-xl h-11 px-6 font-semibold text-sm whitespace-nowrap">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Fetching...</> : <><TrendingUp className="w-4 h-4 mr-2" />Get Trends</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl shadow-orange-200">
              <TrendingUp className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="font-bold text-gray-900 text-lg">Scanning trends for {niche}...</p>
            <p className="text-gray-400 text-sm">Analyzing viral patterns, audio, and formats</p>
          </motion.div>
        )}

        {!loading && !result && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-gray-300" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-700 text-lg">Enter your niche to see trends</p>
              <p className="text-gray-400 text-sm mt-1">Get real-time trending topics, audio & formats</p>
            </div>
          </motion.div>
        )}

        {!loading && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Urgency + Content Idea Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Action Required</span>
                  <Badge className={cn("ml-auto border text-xs font-bold", urgencyColors[result.urgencyLevel])}>
                    {result.urgencyLevel}
                  </Badge>
                </div>
                <p className="text-sm font-semibold leading-relaxed">{result.contentIdea}</p>
                <Link href="/dashboard/chakrabrain">
                  <Button size="sm" className="mt-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl h-8 text-xs font-bold">
                    Generate Script <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Next Big Trend</span>
                </div>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{result.nextBigTrend}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Trends */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" /> Trending Topics
                </h2>
                <div className="space-y-3">
                  {result.topTrends.map((trend, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-orange-100 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-orange-600">#{i + 1}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-sm">{trend.trend}</span>
                              <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">{trend.category}</Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" />{trend.velocity}
                              </span>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{trend.peakWindow}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                          <p className="text-xs font-bold text-blue-700 mb-0.5">How to use</p>
                          <p className="text-xs text-blue-600 leading-relaxed">{trend.howToUse}</p>
                        </div>
                        <div className="p-2.5 bg-purple-50 rounded-xl">
                          <p className="text-xs font-bold text-purple-700 mb-0.5">Content angle</p>
                          <p className="text-xs text-purple-600 leading-relaxed">{trend.exampleAngle}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trending Formats */}
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 pt-2">
                  <Zap className="w-4 h-4 text-purple-600" /> Trending Formats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.trendingFormats.map((fmt, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900 text-sm">{fmt.format}</span>
                        <Badge className="bg-green-50 text-green-700 border-0 text-xs">{fmt.engagementBoost}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{fmt.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-4">
                {/* Trending Audio */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Music2 className="w-4 h-4 text-pink-500" /> Trending Audio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.trendingAudio.map((audio, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-pink-50 rounded-xl border border-pink-100">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                          <Music2 className="w-4 h-4 text-pink-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{audio.trackName}</p>
                          <p className="text-xs text-gray-500">{audio.mood} · {audio.usageCount}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Trending Hashtags */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-blue-500" /> Trending Hashtags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.trendingHashtags.map((tag, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                        <span className="text-sm font-semibold text-blue-600">{tag.hashtag}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{tag.reach}</span>
                          <Badge className={cn("text-xs border-0", tag.competition === "Low" ? "bg-green-100 text-green-700" : tag.competition === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>
                            {tag.competition}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button variant="outline" onClick={handleFetch} className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Refresh Trends
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
