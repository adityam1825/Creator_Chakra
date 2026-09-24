"use client"

import { motion } from "framer-motion"
import { Palette, Star, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Shield, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

const brandMetrics = [
  { label: "Sponsorship Readiness", value: 78, color: "bg-purple-500", status: "Ready" },
  { label: "Niche Authority", value: 85, color: "bg-blue-500", status: "Strong" },
  { label: "Engagement Quality", value: 91, color: "bg-green-500", status: "Excellent" },
  { label: "Content Consistency", value: 72, color: "bg-orange-500", status: "Good" },
  { label: "Brand Safety Score", value: 96, color: "bg-emerald-500", status: "Excellent" },
]

const brandCategories = [
  { name: "Fitness & Wellness", match: 98, deals: "₹50K–₹2L", icon: "💪", color: "bg-green-50 border-green-100" },
  { name: "Nutrition & Food", match: 89, deals: "₹30K–₹1.5L", icon: "🥗", color: "bg-orange-50 border-orange-100" },
  { name: "Activewear & Sports", match: 94, deals: "₹40K–₹3L", icon: "👟", color: "bg-blue-50 border-blue-100" },
  { name: "Health Tech", match: 76, deals: "₹25K–₹1L", icon: "⌚", color: "bg-purple-50 border-purple-100" },
  { name: "Lifestyle & Beauty", match: 71, deals: "₹20K–₹80K", icon: "✨", color: "bg-pink-50 border-pink-100" },
]

const requirements = [
  { label: "10K+ followers", met: true },
  { label: "3%+ engagement rate", met: true },
  { label: "Consistent posting (3+/week)", met: false },
  { label: "Niche-specific content", met: true },
  { label: "Professional bio & highlights", met: true },
  { label: "Media kit ready", met: false },
]

export default function ChakraBrandPage() {
  const { toast } = useToast()

  return (
    <div className="max-w-7xl mx-auto animate-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ChakraBrand</h1>
          <p className="text-sm text-gray-500">Brand Readiness — Check your sponsorship potential</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4 relative">
              <div className="text-4xl font-extrabold text-amber-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>78</div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Brand Ready</h3>
            <p className="text-sm text-gray-500 mb-4">You're eligible for brand collaborations in your niche</p>
            <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-sm px-4 py-1.5 rounded-full font-semibold">
              Mid-Tier Creator
            </Badge>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl w-full">
              <p className="text-xs text-amber-700 font-medium">Estimated deal range: <strong>₹50K – ₹2L per post</strong></p>
            </div>
          </CardContent>
        </Card>

        {/* Brand Metrics */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" /> Brand Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {brandMetrics.map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs border-0 px-2 py-0.5 ${m.value >= 85 ? "bg-green-100 text-green-700" : m.value >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {m.status}
                    </Badge>
                    <span className="text-xs font-bold text-gray-700">{m.value}%</span>
                  </div>
                </div>
                <Progress value={m.value} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Requirements Checklist */}
        <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" /> Brand Requirements
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">What brands look for in creators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {requirements.map((req, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${req.met ? "bg-green-50" : "bg-gray-50"}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${req.met ? "text-green-500" : "text-gray-300"}`} />
                <span className={`text-xs font-medium ${req.met ? "text-green-800" : "text-gray-500"}`}>{req.label}</span>
                {!req.met && <Badge className="ml-auto bg-orange-100 text-orange-700 border-0 text-xs">Fix this</Badge>}
              </div>
            ))}
            <div className="pt-2">
              <Button className="w-full premium-button rounded-xl h-9 text-sm font-semibold"
                onClick={() => toast({ title: "Media kit generated!", description: "Download your brand kit from settings." })}>
                <Zap className="w-4 h-4 mr-2" /> Generate Media Kit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brand Categories */}
        <div className="lg:col-span-3">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Best Brand Matches for Your Niche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandCategories.map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-4 rounded-2xl border ${brand.color} hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{brand.icon}</span>
                  <Badge className="bg-white text-gray-700 border-gray-200 text-xs font-bold">{brand.match}% match</Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{brand.name}</h3>
                <p className="text-xs text-gray-500 mb-3">Estimated deal: <strong className="text-gray-700">{brand.deals}</strong></p>
                <Button variant="ghost" size="sm" className="w-full h-8 text-xs rounded-xl hover:bg-white/80"
                  onClick={() => toast({ description: `Connecting you with ${brand.name} brands...` })}>
                  Find Brands <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
