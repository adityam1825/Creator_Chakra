"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, Loader2, Sparkles, Copy, CheckCircle2, ArrowRight,
  Star, TrendingUp, MessageSquare, Zap, RefreshCw, Target
} from "lucide-react"
import { chakraConnect, ChakraConnectOutput } from "@/ai/flows/chakraconnect"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const collabGoals = ["Grow Audience", "Brand Deals", "Cross-Niche", "Viral Collab", "Educational Series"] as const

export default function ChakraConnectPage() {
  const { toast } = useToast()
  const [niche, setNiche] = useState("")
  const [platform, setPlatform] = useState("Instagram")
  const [followerCount, setFollowerCount] = useState("")
  const [contentStyle, setContentStyle] = useState("")
  const [collabGoal, setCollabGoal] = useState<typeof collabGoals[number]>("Grow Audience")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChakraConnectOutput | null>(null)
  const [copiedScript, setCopiedScript] = useState(false)

  const handleMatch = async () => {
    if (!niche || !followerCount) { toast({ variant: "destructive", description: "Fill in your niche and follower count" }); return }
    setLoading(true)
    setResult(null)
    try {
      const output = await chakraConnect({ niche, platform, followerCount, contentStyle: contentStyle || `${niche} creator`, collabGoal })
      setResult(output)
      toast({ title: "Matches found!", description: `Found ${output.matches.length} collaboration opportunities` })
    } catch {
      toast({ variant: "destructive", title: "Matching failed", description: "Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const copyScript = () => {
    if (!result) return
    navigator.clipboard.writeText(result.collabScript)
    setCopiedScript(true)
    toast({ description: "DM script copied!" })
    setTimeout(() => setCopiedScript(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto animate-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraConnect</h1>
          <p className="text-sm text-gray-500">AI Collab Matcher — Find your perfect creator partnerships</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-gray-900">Your Creator Profile</CardTitle>
              <CardDescription className="text-xs text-gray-400">Tell us about yourself to find the best matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your Niche</label>
                <Input placeholder="e.g. Fitness, Dance, Tech..." value={niche} onChange={e => setNiche(e.target.value)}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Instagram", "YouTube", "TikTok", "LinkedIn"].map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Followers</label>
                  <Input placeholder="e.g. 50K, 1M" value={followerCount} onChange={e => setFollowerCount(e.target.value)}
                    className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Content Style</label>
                <Input placeholder="e.g. Motivational workout reels, educational..." value={contentStyle} onChange={e => setContentStyle(e.target.value)}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Collab Goal</label>
                <div className="flex flex-wrap gap-1.5">
                  {collabGoals.map(g => (
                    <button key={g} type="button" onClick={() => setCollabGoal(g)}
                      className={cn("px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
                        collabGoal === g ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                      )}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleMatch} disabled={loading} className="w-full premium-button rounded-xl h-11 font-semibold text-sm">
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Finding Matches...</span>
                ) : (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" />Find Collaborators</span>
                )}
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-200">
                  <Users className="w-8 h-8 text-white animate-pulse" />
                </div>
                <p className="font-bold text-gray-900 text-lg">Finding your perfect matches...</p>
                <p className="text-gray-400 text-sm">Analyzing audience overlap, content style & goals</p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-lg">Find your collab partners</p>
                  <p className="text-gray-400 text-sm mt-1">Fill in your profile to get AI-matched collaborators</p>
                </div>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">Best Format</div>
                    <p className="text-sm font-semibold text-gray-900">{result.bestCollabFormat}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Growth Potential</div>
                    <p className="text-sm font-semibold text-gray-900">{result.growthPotential}</p>
                  </div>
                </div>

                {/* Matches */}
                <div className="space-y-3">
                  {result.matches.map((match, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                {match.creatorType.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{match.creatorType}</p>
                                <p className="text-xs text-gray-500">{match.nicheDescription}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-1">
                                <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-2 bg-indigo-500 rounded-full" style={{ width: `${match.matchPercentage}%` }} />
                                </div>
                                <span className="text-xs font-bold text-indigo-600">{match.matchPercentage}%</span>
                              </div>
                              <span className="text-xs text-gray-400">match</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="p-2.5 bg-blue-50 rounded-xl">
                              <p className="text-xs font-bold text-blue-700 mb-0.5">Audience Overlap</p>
                              <p className="text-xs text-blue-600">{match.audienceOverlap}</p>
                            </div>
                            <div className="p-2.5 bg-green-50 rounded-xl">
                              <p className="text-xs font-bold text-green-700 mb-0.5">Expected Reach</p>
                              <p className="text-xs text-green-600">{match.expectedReach}</p>
                            </div>
                          </div>

                          <div className="p-2.5 bg-purple-50 rounded-xl mb-3">
                            <p className="text-xs font-bold text-purple-700 mb-0.5">Collab Idea</p>
                            <p className="text-xs text-purple-600 leading-relaxed">{match.collabIdea}</p>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">{match.whyTheyMatch}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Reel Ideas */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" /> Collab Reel Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.reelIdeas.map((idea, i) => (
                      <div key={i} className="flex gap-2.5 p-2.5 bg-yellow-50 rounded-xl border border-yellow-100">
                        <span className="text-yellow-600 font-bold text-xs w-5 shrink-0">{i + 1}.</span>
                        <p className="text-xs text-yellow-800 leading-relaxed">{idea}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* DM Script */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-500" /> DM Outreach Script
                      </CardTitle>
                      <button onClick={copyScript}
                        className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                          copiedScript ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}>
                        {copiedScript ? <><CheckCircle2 className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy Script</>}
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.collabScript}</p>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" onClick={() => setResult(null)} className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Find New Matches
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
