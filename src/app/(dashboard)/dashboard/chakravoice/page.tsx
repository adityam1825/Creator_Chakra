"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic, MicOff, Loader2, Sparkles, Copy, Flame, Target,
  Brain, Waves, CheckCircle2, RefreshCw, MessageSquare
} from "lucide-react"
import { voiceToContent, VoiceToContentOutput } from "@/ai/flows/voice-to-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function ChakraVoicePage() {
  const { toast } = useToast()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VoiceToContentOutput | null>(null)
  const [platform, setPlatform] = useState<any>("Instagram")
  const [contentType, setContentType] = useState<any>("Caption")
  const [language, setLanguage] = useState("English")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SR) {
        recognitionRef.current = new SR()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.onresult = (e: any) => {
          let t = ""
          for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript
          setTranscript(t)
        }
        recognitionRef.current.onerror = () => {
          setIsRecording(false)
          toast({ variant: "destructive", description: "Microphone error. Please check permissions." })
        }
      }
    }
  }, [toast])

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      setTranscript("")
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  const handleGenerate = async () => {
    if (!transcript.trim()) return
    setLoading(true)
    try {
      const output = await voiceToContent({ transcript, platform, contentType, language })
      setResult(output)
      toast({ title: "Voice transformed!", description: "Your spoken idea is now viral-ready content." })
    } catch {
      toast({ variant: "destructive", description: "Failed to transform voice. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast({ description: "Copied!" })
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto animate-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraVoice</h1>
          <p className="text-sm text-gray-500">Voice to Content — Speak your idea, get viral content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-gray-900">Voice Input</CardTitle>
              <CardDescription className="text-xs text-gray-400">Speak your raw idea — AI will polish it into viral content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Mic Button */}
              <div className="flex flex-col items-center py-8 bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
                <AnimatePresence>
                  {isRecording && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-32 h-32 bg-rose-400 rounded-full blur-3xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative z-10",
                    isRecording
                      ? "bg-red-500 shadow-red-200"
                      : "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-200"
                  )}
                >
                  {isRecording ? <MicOff className="w-9 h-9 text-white" /> : <Mic className="w-9 h-9 text-white" />}
                </motion.button>
                <p className="mt-4 text-sm font-semibold text-gray-600 relative z-10">
                  {isRecording ? "Recording... tap to stop" : "Tap to start speaking"}
                </p>
                {isRecording && (
                  <div className="mt-3 flex items-center gap-1 relative z-10">
                    {[...Array(8)].map((_, i) => (
                      <motion.div key={i}
                        animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.06 }}
                        className="w-1.5 bg-rose-400 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Transcript */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Transcript</label>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 min-h-[100px] text-sm text-gray-700 leading-relaxed">
                  {transcript || <span className="text-gray-400 italic">Your speech will appear here...</span>}
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Instagram", "YouTube", "LinkedIn", "Twitter/X"].map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Format</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Caption", "Reel Script", "Carousel", "Thread", "Blog Intro"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-9 rounded-xl border-gray-200 bg-gray-50 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["English", "Hindi", "Spanish", "French", "German"].map(l => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleGenerate} disabled={loading || !transcript.trim()} className="w-full premium-button rounded-xl h-11 font-semibold text-sm">
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Transforming...</span>
                ) : (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" />Transform to Content</span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-xl shadow-rose-200">
                  <Waves className="w-8 h-8 text-white animate-pulse" />
                </div>
                <p className="font-bold text-gray-900 text-lg">Transforming your voice...</p>
                <p className="text-gray-400 text-sm">Polishing, structuring, and optimizing for virality</p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Waves className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-lg">Speak your idea</p>
                  <p className="text-gray-400 text-sm mt-1">Record your raw thoughts and let AI turn them into viral content</p>
                </div>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Score Banner */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-200">Virality Score</p>
                    <p className="text-3xl font-extrabold">{result.viralityScore}<span className="text-lg text-rose-200">/100</span></p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-rose-200">{platform} · {contentType}</p>
                    <p className="text-sm font-semibold">{language}</p>
                  </div>
                </div>

                {/* Hook */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-yellow-50 flex items-center justify-center">
                        <Flame className="w-3.5 h-3.5 text-yellow-500" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Viral Hook</span>
                      <button onClick={() => copy("hook", result.viralHook)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                        {copiedId === "hook" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xl font-bold text-gray-900 leading-tight">"{result.viralHook}"</p>
                  </CardContent>
                </Card>

                {/* Main Content */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Target className="w-3.5 h-3.5 text-purple-500" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Polished Content</span>
                      <button onClick={() => copy("main", result.mainContent)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                        {copiedId === "main" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.mainContent}</p>
                  </CardContent>
                </Card>

                {/* Tone + Hashtags */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold text-gray-700">Tone Analysis</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{result.toneAnalysis}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-bold text-gray-700">Hashtags</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {result.hashtags.slice(0, 6).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" /> AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-2.5 p-2.5 bg-purple-50 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-purple-800 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button variant="outline" onClick={() => { setResult(null); setTranscript("") }} className="w-full rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 h-10 text-sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Record New Idea
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
