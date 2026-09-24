"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3, Zap, Loader2, Copy, CheckCircle2, AlertCircle,
  RefreshCw, Target, Eye, FileText, Video, Link, Lightbulb
} from "lucide-react"
import { chakraScore, ChakraScoreOutput } from "@/ai/flows/chakrascore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts"

/* ─── Score Gauge ─── */
function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80 ? "#10B981" :
    score >= 60 ? "#8B5CF6" :
    score >= 40 ? "#F59E0B" : "#EF4444"
  const label =
    score >= 80 ? "Viral Ready 🔥" :
    score >= 60 ? "Good Potential" :
    score >= 40 ? "Needs Work" : "Major Revamp"
  const r = 60
  const circ = 2 * Math.PI * r
  const offset = circ - (circ * score) / 100

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r={r} fill="none" stroke="#F3F4F6" strokeWidth="12" />
          <motion.circle
            cx="72" cy="72" r={r} fill="none"
            stroke={color} strokeWidth="12"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-extrabold text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {score}
          </span>
          <span className="text-xs text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      <Badge
        style={{ backgroundColor: color + "20", color, borderColor: color + "40" }}
        className="border text-sm font-bold px-4 py-1 rounded-full"
      >
        {label}
      </Badge>
    </div>
  )
}

/* ─── Main Page ─── */
export default function ChakraScorePage() {
  const { toast } = useToast()

  // Tab: "description" or "video"
  const [mode, setMode] = useState<"description" | "video">("description")

  // Inputs
  const [descriptionText, setDescriptionText] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [niche, setNiche] = useState("")
  const [platform, setPlatform] = useState<any>("Instagram")

  // State
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChakraScoreOutput | null>(null)
  const [copied, setCopied] = useState(false)

  const activeContent = mode === "description" ? descriptionText : videoUrl
  const canSubmit = activeContent.trim().length > 0

  const handleAnalyze = async () => {
    if (!canSubmit) return
    setLoading(true)
    setResult(null)
    try {
      const output = await chakraScore({
        mode,
        content: activeContent,
        niche: niche || undefined,
        platform: platform || undefined,
      })
      setResult(output)
      toast({
        title: "Analysis complete!",
        description: `Your content scored ${output.overallScore}/100`,
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: err?.message ?? "Please check your API key and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyHook = () => {
    if (!result) return
    navigator.clipboard.writeText(result.improvedHook)
    setCopied(true)
    toast({ description: "Improved hook copied!" })
    setTimeout(() => setCopied(false), 2000)
  }

  const radarData = result
    ? [
        { subject: "Hook",      value: result.breakdown.hookStrength },
        { subject: "Retention", value: result.breakdown.retentionPotential },
        { subject: "Trend",     value: result.breakdown.trendAlignment },
        { subject: "Emotion",   value: result.breakdown.emotionalImpact },
        { subject: "Clarity",   value: result.breakdown.clarityScore },
        { subject: "CTA",       value: result.breakdown.ctaStrength },
      ]
    : []

  return (
    <div className="max-w-7xl mx-auto animate-in">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500
          flex items-center justify-center shadow-lg shadow-blue-200">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ChakraScore
          </h1>
          <p className="text-sm text-gray-500">
            Virality Predictor — Know your score before you post
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left: Input Panel ── */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-gray-900">
                Choose Evaluation Mode
              </CardTitle>
              <CardDescription className="text-xs text-gray-400">
                Paste a description/script OR share a video link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Mode Tabs */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => { setMode("description"); setResult(null) }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all",
                    mode === "description"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  onClick={() => { setMode("video"); setResult(null) }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all",
                    mode === "video"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Video className="w-4 h-4" />
                  Video Link
                </button>
              </div>

              {/* Description Input */}
              <AnimatePresence mode="wait">
                {mode === "description" && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Script / Caption / Content Description
                    </label>
                    <Textarea
                      placeholder="Paste your reel script, caption, content idea, or full description here...

Example:
'Stop scrolling if you want abs in 30 days. I tried this exact workout every morning for a month and here's what happened...' "
                      className="min-h-[200px] resize-none rounded-xl border-gray-200 bg-gray-50
                        focus:bg-white text-sm leading-relaxed"
                      value={descriptionText}
                      onChange={e => setDescriptionText(e.target.value)}
                    />
                    <p className="text-xs text-gray-400">
                      {descriptionText.length} characters
                    </p>
                  </motion.div>
                )}

                {mode === "video" && (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Video URL
                    </label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
                        className="pl-9 h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-700 font-medium leading-relaxed">
                        <strong>Supported:</strong> YouTube, Instagram Reels, TikTok, YouTube Shorts.
                        AI will analyze the video topic, format, and platform to give you a score.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Niche + Platform */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Niche
                  </label>
                  <Input
                    placeholder="e.g. Fitness"
                    value={niche}
                    onChange={e => setNiche(e.target.value)}
                    className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Platform
                  </label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Instagram", "YouTube", "TikTok", "LinkedIn", "Twitter"].map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleAnalyze}
                disabled={loading || !canSubmit}
                className="w-full premium-button rounded-xl h-11 font-semibold text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {mode === "description" ? "Analyze Description" : "Analyze Video"}
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Predicted Engagement — shown after result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-gray-900">
                    Predicted Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Likes",    value: result.predictedEngagement.likes,    color: "text-pink-600",   bg: "bg-pink-50" },
                    { label: "Comments", value: result.predictedEngagement.comments, color: "text-blue-600",   bg: "bg-blue-50" },
                    { label: "Shares",   value: result.predictedEngagement.shares,   color: "text-green-600",  bg: "bg-green-50" },
                    { label: "Saves",    value: result.predictedEngagement.saves,    color: "text-purple-600", bg: "bg-purple-50" },
                  ].map((m, i) => (
                    <div key={i} className={`p-3 rounded-xl ${m.bg} text-center`}>
                      <div className={`text-base font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-xs text-gray-500 font-medium">{m.label}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* ── Right: Results Panel ── */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">

            {/* Loading */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500
                  flex items-center justify-center shadow-xl shadow-blue-200">
                  <BarChart3 className="w-8 h-8 text-white animate-pulse" />
                </div>
                <p className="font-bold text-gray-900 text-lg">Analyzing your content...</p>
                <p className="text-gray-400 text-sm">
                  {mode === "description"
                    ? "Checking hook strength, retention, trends & more"
                    : "Fetching video data and running virality analysis"}
                </p>
                <div className="flex gap-2 mt-1">
                  {["Hook", "Retention", "Trends", "Emotion", "CTA"].map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.3 }}
                      className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                    >
                      {s}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Empty state */}
            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4
                  border-2 border-dashed border-gray-200 rounded-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-lg">
                    {mode === "description" ? "Paste content to analyze" : "Share a video link"}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {mode === "description"
                      ? "Get a virality score before you post"
                      : "Analyze any YouTube, Instagram or TikTok video"}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Score + Radar */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <ScoreGauge score={result.overallScore} />
                      <div className="flex-1 w-full">
                        <p className="text-base font-bold text-gray-900 mb-3">
                          {result.verdict}
                        </p>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                              <PolarGrid stroke="#F3F4F6" />
                              <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                              />
                              <Radar
                                dataKey="value"
                                stroke="#8B5CF6"
                                fill="#8B5CF6"
                                fillOpacity={0.15}
                                strokeWidth={2}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Score Breakdown bars */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900">
                      Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "Hook Strength",       value: result.breakdown.hookStrength,       color: "bg-yellow-500" },
                      { label: "Retention Potential", value: result.breakdown.retentionPotential, color: "bg-blue-500" },
                      { label: "Trend Alignment",     value: result.breakdown.trendAlignment,     color: "bg-green-500" },
                      { label: "Emotional Impact",    value: result.breakdown.emotionalImpact,    color: "bg-pink-500" },
                      { label: "Clarity",             value: result.breakdown.clarityScore,       color: "bg-purple-500" },
                      { label: "CTA Strength",        value: result.breakdown.ctaStrength,        color: "bg-orange-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-600 w-36 shrink-0">
                          {item.label}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                            className={`h-2 rounded-full ${item.color}`}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700 w-8 text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      What's Working
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <div key={i} className="flex gap-2.5 p-2.5 bg-green-50 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-green-800 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Improvements */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.improvements.map((imp, i) => (
                      <div key={i} className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <p className="text-xs font-bold text-orange-800 mb-1">
                          ⚠️ {imp.issue}
                        </p>
                        <p className="text-xs text-orange-700 mb-1.5">
                          ✅ Fix: {imp.fix}
                        </p>
                        <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                          Impact: {imp.impact}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Improved Hook */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      AI-Improved Hook
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-bold text-purple-900 leading-snug flex-1">
                        "{result.improvedHook}"
                      </p>
                      <button
                        onClick={copyHook}
                        className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors text-purple-400 shrink-0"
                      >
                        {copied
                          ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                          : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail + Retention */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold text-gray-700">Thumbnail</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {result.thumbnailSuggestion}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-bold text-gray-700">Retention Tip</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {result.retentionAdvice}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Follow-up Content Ideas */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      Follow-up Content Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.contentIdeas.map((idea, i) => (
                      <div key={i} className="flex gap-2.5 p-2.5 bg-yellow-50 rounded-xl border border-yellow-100">
                        <span className="text-yellow-600 font-bold text-xs w-5 shrink-0">
                          {i + 1}.
                        </span>
                        <p className="text-xs text-yellow-800 leading-relaxed">{idea}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Reset */}
                <Button
                  variant="outline"
                  onClick={() => { setResult(null); setDescriptionText(""); setVideoUrl("") }}
                  className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Analyze New Content
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
