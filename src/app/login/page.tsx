"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Eye, EyeOff, Instagram, Youtube, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const mockCreators = [
  { name: "Priya Sharma", handle: "@priyacreates", niche: "Fitness", avatar: "PS", followers: "340K" },
  { name: "Arjun Mehta", handle: "@arjuntech", niche: "Tech", avatar: "AM", followers: "890K" },
  { name: "Zara Khan", handle: "@zaradances", niche: "Dance", avatar: "ZK", followers: "1.2M" },
]

const socialLogins = [
  { name: "Continue with Google", icon: "G", color: "border-gray-200 hover:bg-gray-50 text-gray-700", iconBg: "bg-red-500" },
  { name: "Continue with Instagram", icon: Instagram, color: "border-pink-100 hover:bg-pink-50 text-pink-700", iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" },
  { name: "Continue with YouTube", icon: Youtube, color: "border-red-100 hover:bg-red-50 text-red-700", iconBg: "bg-red-600" },
  { name: "Continue with TikTok", icon: Music2, color: "border-gray-200 hover:bg-gray-50 text-gray-700", iconBg: "bg-black" },
]

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSocialLogin = (provider: string) => {
    setLoading(true)
    setTimeout(() => {
      toast({ title: `Signed in with ${provider}`, description: "Welcome to Creator Chakra!" })
      router.push("/dashboard")
    }, 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast({ title: mode === "login" ? "Welcome back!" : "Account created!", description: "Redirecting to your dashboard..." })
      router.push("/dashboard")
    }, 1000)
  }

  const handleMockLogin = (creator: typeof mockCreators[0]) => {
    setLoading(true)
    setTimeout(() => {
      toast({ title: `Logged in as ${creator.name}`, description: "Welcome to Creator Chakra!" })
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Creator Chakra
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your AI-Powered<br />Content Strategist
          </h2>
          <p className="text-purple-200 text-lg mb-10 leading-relaxed">
            Know exactly what to create, when to post, and how to go viral — every single time.
          </p>

          {/* Mock creator accounts */}
          <div className="space-y-3">
            <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">Try a demo account</p>
            {mockCreators.map((creator, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 4 }}
                onClick={() => handleMockLogin(creator)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {creator.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{creator.name}</div>
                  <div className="text-purple-300 text-xs">{creator.handle} · {creator.niche} · {creator.followers}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-purple-300 text-sm">
          <span>50K+ creators</span>
          <span>·</span>
          <span>2.4M content pieces</span>
          <span>·</span>
          <span>4.9★ rating</span>
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Creator Chakra
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {/* Tab switcher */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                    mode === m ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              {mode === 'login' ? 'Sign in to your Creator Chakra account' : 'Start your creator journey today'}
            </p>

            {/* Social logins */}
            <div className="space-y-3 mb-6">
              {socialLogins.map((social, i) => (
                <button
                  key={i}
                  onClick={() => handleSocialLogin(social.name.replace('Continue with ', ''))}
                  disabled={loading}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                    social.color
                  )}
                >
                  <div className={cn("w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold", social.iconBg)}>
                    {typeof social.icon === 'string' ? social.icon : <social.icon className="w-3.5 h-3.5" />}
                  </div>
                  {social.name}
                </button>
              ))}
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400 font-medium">or continue with email</span>
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    placeholder="Your creator name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full premium-button rounded-xl h-11 font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-purple-600 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Quick demo access */}
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-gray-400 hover:text-purple-600 transition-colors font-medium"
            >
              Skip to demo dashboard →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
