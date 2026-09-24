"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Brain, Sparkles, Loader2, Copy, ChevronDown, ChevronUp,
  Zap, Music2, Camera, Mic, Film, Hash, MessageSquare,
  Target, Eye, TrendingUp, Star, RefreshCw, CheckCircle2
} from "lucide-react"
import { chakraBrain, ChakraBrainOutput } from "@/ai/flows/chakrabrain"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  topic: z.string().min(5, "Topic must be at least 5 characters"),
  niche: z.string().min(2, "Enter your niche"),
  platform: z.enum(["Instagram", "YouTube", "TikTok", "YouTube Shorts"]),
  reelDuration: z.enum(["15s", "30s", "60s", "90s", "3min"]),
  tone: z.enum(["Motivational", "Educational", "Entertaining", "Emotional", "Funny", "Inspirational", "Controversial"]),
  targetAudience: z.string().optional(),
})

const niches = ["Fitness", "Dance", "Food", "Travel", "Tech", "Fashion", "Beauty", "Finance", "Motivation", "Comedy", "Education", "Gaming", "Lifestyle", "Business", "Art"]

function ScoreRing({ score }: { score: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (circ * score) / 100
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#8B5CF6" : "#F59E0B"
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#F3F4F6" strokeWidth="8" />
        <motion.circle
          cx="48" cy="48" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{score}</span>
        <span className="text-xs text-gray-400 font-medium">score</span>
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({ description: "Copied to clipboard!" })
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700">
      {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

function Section({ title, icon: Icon, iconColor, children, defaultOpen = true }: any) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconColor}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 bg-white border-t border-gray-50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ChakraBrainPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChakraBrainOutput | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      niche: "",
      platform: "Instagram",
      reelDuration: "30s",
      tone: "Motivational",
      targetAudience: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setResult(null)
    try {
      const output = await chakraBrain(values)
      setResult(output)
      toast({ title: "Content blueprint ready!", description: "Your viral reel strategy has been generated." })
    } catch (err: any) {
      console.error("ChakraBrain error:", err)
      const msg = err?.message || err?.toString() || "Unknown error"
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: msg.length > 120 ? msg.slice(0, 120) + "…" : msg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto animate-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-200">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ChakraBrain
          </h1>
          <p className="text-sm text-gray-500">AI Content Engine — Generate your complete viral reel blueprint</p>
        </div>
        <Badge className="ml-auto bg-purple-50 text-purple-700 border-purple-100 text-xs font-semibold px-3 py-1">
          <Zap className="w-3 h-3 mr-1" /> AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-gray-900">Content Parameters</CardTitle>
              <CardDescription className="text-xs text-gray-400">Tell ChakraBrain about your content idea</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="topic" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Content Topic / Idea</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. 5 morning habits that changed my fitness journey..."
                          className="min-h-[90px] resize-none rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="niche" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your Niche</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input placeholder="e.g. Fitness, Dance, Tech..." className="rounded-xl border-gray-200 bg-gray-50 focus:bg-white h-10 text-sm" {...field} />
                          <div className="flex flex-wrap gap-1.5">
                            {niches.slice(0, 8).map(n => (
                              <button key={n} type="button" onClick={() => form.setValue("niche", n)}
                                className={cn("px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
                                  form.watch("niche") === n ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                                )}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="platform" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="TikTok">TikTok</SelectItem>
                            <SelectItem value="YouTube Shorts">YT Shorts</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="reelDuration" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["15s", "30s", "60s", "90s", "3min"].map(d => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="tone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Content Tone</FormLabel>
                      <div className="flex flex-wrap gap-1.5">
                        {["Motivational", "Educational", "Entertaining", "Emotional", "Funny", "Inspirational", "Controversial"].map(t => (
                          <button key={t} type="button" onClick={() => form.setValue("tone", t as any)}
                            className={cn("px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
                              form.watch("tone") === t ? "bg-purple-600 text-white border-purple-600" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                            )}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="targetAudience" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Target Audience <span className="text-gray-400 normal-case font-normal">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Women 18-30 interested in fitness..." className="rounded-xl border-gray-200 bg-gray-50 focus:bg-white h-10 text-sm" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />

                  <Button type="submit" disabled={loading} className="w-full premium-button rounded-xl h-11 font-semibold text-sm">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Blueprint...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate Viral Blueprint
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-200">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">ChakraBrain is thinking...</p>
                  <p className="text-gray-400 text-sm mt-1">Analyzing trends, psychology & your niche</p>
                </div>
                <div className="flex gap-2 mt-2">
                  {["Analyzing niche", "Crafting hook", "Building script", "Optimizing for virality"].map((step, i) => (
                    <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }}
                      className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-lg">Your blueprint will appear here</p>
                  <p className="text-gray-400 text-sm mt-1">Fill in the parameters and hit Generate</p>
                </div>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Score + Concept */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-xs font-semibold uppercase tracking-wider mb-1">Viral Concept</p>
                        <h2 className="text-xl font-bold leading-tight">{result.viralConcept}</h2>
                      </div>
                      <ScoreRing score={result.estimatedViralScore} />
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 border-t border-purple-100">
                    <p className="text-xs text-purple-700 font-medium leading-relaxed">{result.viralPsychology}</p>
                  </div>
                </Card>

                {/* Hook */}
                <Section title="Opening Hook (First 3 Seconds)" icon={Zap} iconColor="bg-yellow-50 text-yellow-600">
                  <div className="flex items-start justify-between gap-3 mt-3">
                    <p className="text-2xl font-bold text-gray-900 leading-tight flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      "{result.hook}"
                    </p>
                    <CopyButton text={result.hook} />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">This hook is designed to stop the scroll in the first 2 seconds</p>
                </Section>

                {/* Full Script */}
                <Section title="Full Script" icon={Film} iconColor="bg-blue-50 text-blue-600">
                  <div className="relative mt-3">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans bg-gray-50 rounded-xl p-4 border border-gray-100">
                      {result.fullScript}
                    </pre>
                    <div className="absolute top-3 right-3">
                      <CopyButton text={result.fullScript} />
                    </div>
                  </div>
                </Section>

                {/* Shot by Shot */}
                <Section title="Shot-by-Shot Guide" icon={Camera} iconColor="bg-violet-50 text-violet-600">
                  <div className="space-y-3 mt-3">
                    {result.shotByShot.map((shot, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {shot.shot}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-blue-50 text-blue-600 border-0 text-xs">{shot.duration}</Badge>
                            <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">{shot.cameraAngle}</Badge>
                          </div>
                          <p className="text-xs font-semibold text-gray-700">{shot.visual}</p>
                          {shot.dialogue && <p className="text-xs text-gray-500 mt-1 italic">"{shot.dialogue}"</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Performance Tips */}
                <Section title="How to Perform This Reel" icon={Star} iconColor="bg-orange-50 text-orange-600">
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {[
                      { label: "Facial Expressions", value: result.performanceTips.facialExpressions, icon: "😊" },
                      { label: "Body Language", value: result.performanceTips.bodyLanguage, icon: "🤸" },
                      { label: "Energy Level", value: result.performanceTips.energyLevel, icon: "⚡" },
                      { label: "Pacing", value: result.performanceTips.pacing, icon: "🎯" },
                    ].map((tip, i) => (
                      <div key={i} className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="text-lg mb-1">{tip.icon}</div>
                        <p className="text-xs font-bold text-orange-800 mb-1">{tip.label}</p>
                        <p className="text-xs text-orange-700 leading-relaxed">{tip.value}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Music */}
                <Section title="Music & Audio" icon={Music2} iconColor="bg-pink-50 text-pink-600">
                  <div className="mt-3 space-y-3">
                    <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
                      <p className="text-xs font-bold text-pink-800 mb-1">{result.musicSuggestion.trackType} · {result.musicSuggestion.mood}</p>
                      <p className="text-xs text-pink-700">{result.musicSuggestion.timing}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.musicSuggestion.examples.map((ex, i) => (
                        <Badge key={i} className="bg-gray-100 text-gray-600 border-0 text-xs">{ex}</Badge>
                      ))}
                    </div>
                  </div>
                </Section>

                {/* Editing Style */}
                <Section title="Editing Style" icon={Film} iconColor="bg-emerald-50 text-emerald-600" defaultOpen={false}>
                  <p className="text-sm text-gray-700 leading-relaxed mt-3">{result.editingStyle}</p>
                </Section>

                {/* Caption + Hashtags */}
                <Section title="Caption & Hashtags" icon={Hash} iconColor="bg-indigo-50 text-indigo-600">
                  <div className="mt-3 space-y-3">
                    <div className="relative">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {result.caption}
                      </div>
                      <div className="absolute top-2 right-2">
                        <CopyButton text={result.caption} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.hashtags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium border border-purple-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Section>

                {/* CTA + Thumbnail */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Call to Action</span>
                    </div>
                    <p className="text-sm text-gray-700">{result.cta}</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Thumbnail Text</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{result.thumbnailText}</p>
                  </div>
                </div>

                {/* Regenerate */}
                <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()} className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Generate Another Version
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
