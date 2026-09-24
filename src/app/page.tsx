"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, ArrowRight, Zap, Brain, TrendingUp, Users, 
  Star, CheckCircle2, Play, ChevronRight, Instagram, Youtube,
  Music2, BarChart3, Calendar, Mic, Layers, Globe, Target,
  Shield, Award, Flame
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Brain,
    name: "ChakraBrain",
    tagline: "AI Content Engine",
    desc: "Generate viral reel concepts, full scripts, shot guides, music suggestions, and captions — all niche-aware.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: TrendingUp,
    name: "ChakraScore",
    tagline: "Virality Predictor",
    desc: "Upload your script or video. Get a score out of 100 with hook strength, retention potential, and improvement tips.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Calendar,
    name: "ChakraFlow",
    tagline: "Smart Scheduler",
    desc: "AI-powered posting calendar. Know exactly when to post for maximum reach based on your niche and audience.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Flame,
    name: "ChakraTrend",
    tagline: "Trend Intelligence",
    desc: "Real-time trending hashtags, audio, formats, and topics. Never miss a viral wave in your niche again.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Layers,
    name: "ChakraMorph",
    tagline: "Content Repurposer",
    desc: "Turn one reel into a carousel, blog, tweet, and newsletter. Multiply your content output 10x automatically.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Users,
    name: "ChakraConnect",
    tagline: "Collab Matcher",
    desc: "AI matches you with creators in your niche based on audience overlap, engagement quality, and content style.",
    color: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
]

const stats = [
  { value: "50K+", label: "Active Creators" },
  { value: "2.4M", label: "Content Pieces Generated" },
  { value: "94%", label: "Avg Virality Score Improvement" },
  { value: "3.2x", label: "Average Growth Rate" },
]

const testimonials = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    avatar: "PS",
    niche: "Fitness Creator",
    text: "Creator Chakra told me exactly what workout content to make, when to post it, and even suggested the trending audio. My reels went from 2K to 180K views in 3 weeks.",
    followers: "340K",
    platform: "Instagram",
  },
  {
    name: "Arjun Mehta",
    handle: "@arjuntech",
    avatar: "AM",
    niche: "Tech Creator",
    text: "The ChakraBrain feature is insane. It generates full scripts with camera angles, facial expressions, and editing tips. It's like having a professional director in my pocket.",
    followers: "890K",
    platform: "YouTube",
  },
  {
    name: "Zara Khan",
    handle: "@zaradances",
    avatar: "ZK",
    niche: "Dance Creator",
    text: "ChakraTrend showed me the exact dance trend before it blew up. I posted 2 days before everyone else and got 1.2M views. This platform is a cheat code.",
    followers: "1.2M",
    platform: "Instagram",
  },
]

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for new creators",
    features: ["10 AI generations/month", "ChakraBrain basic", "ChakraTrend access", "Basic analytics"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Creator",
    price: "₹999",
    period: "/month",
    desc: "For serious content creators",
    features: ["Unlimited AI generations", "Full ChakraBrain suite", "ChakraScore analysis", "ChakraFlow scheduler", "ChakraMorph repurposer", "Priority support"],
    cta: "Start Creating",
    popular: true,
  },
  {
    name: "Agency",
    price: "₹3,999",
    period: "/month",
    desc: "For agencies & power creators",
    features: ["Everything in Creator", "10 creator profiles", "ChakraConnect matching", "White-label reports", "API access", "Dedicated strategist"],
    cta: "Scale Up",
    popular: false,
  },
]

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-200">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Creator <span className="text-gradient">Chakra</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Testimonials'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Sign in
            </Link>
            <Button className="premium-button rounded-xl h-9 px-5 text-sm" asChild>
              <Link href="/login">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Soft gradient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">AI Creator Operating System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Know Exactly What to{" "}
            <span className="text-gradient">Create</span>,{" "}
            <br className="hidden md:block" />
            When to Post &{" "}
            <span className="text-gradient">Go Viral</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Creator Chakra is your AI-powered content strategist, viral coach, and growth manager — all in one platform built for modern creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="premium-button rounded-2xl h-14 px-8 text-base font-semibold w-full sm:w-auto" asChild>
              <Link href="/login">
                Start Creating for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-base font-semibold w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/dashboard">
                <Play className="w-4 h-4 mr-2 fill-gray-700" />
                See Dashboard
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['PS', 'AM', 'ZK', 'RV'].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                ))}
              </div>
              <span className="font-medium text-gray-600">50,000+ creators growing</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 font-medium text-gray-600">4.9/5 rating</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-6xl mx-auto mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none z-10 bottom-0 h-32 top-auto" />
          <div className="rounded-3xl border border-gray-200 shadow-2xl shadow-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 bg-white rounded-lg px-3 py-1 text-xs text-gray-400 text-center">
                app.creatorchakra.com/dashboard
              </div>
            </div>
            <img
              src="https://picsum.photos/seed/chakra_dashboard/1400/800"
              alt="Creator Chakra Dashboard"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-50 text-purple-700 border-purple-100 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              The Chakra Suite
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Everything a Creator Needs
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From idea to viral post — Creator Chakra handles every step of your content journey with AI precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", feature.bg)}>
                  <feature.icon className={cn("w-6 h-6", feature.iconColor)} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                  <Badge className="bg-gray-100 text-gray-500 border-0 text-xs px-2 py-0.5 rounded-full">{feature.tagline}</Badge>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-purple-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore feature <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              From Idea to Viral in Minutes
            </h2>
            <p className="text-lg text-gray-500">Three simple steps to transform your content game</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us your niche", desc: "Enter your content niche, platform, and audience. Creator Chakra learns your style and goals.", icon: Target },
              { step: "02", title: "AI builds your strategy", desc: "ChakraBrain generates scripts, hooks, captions, music suggestions, and a full posting calendar.", icon: Brain },
              { step: "03", title: "Post & watch it grow", desc: "Follow the AI's guidance on performance, timing, and trends. Track your growth in real-time.", icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-purple-200 to-transparent z-0" />
                )}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative z-10">
                  <div className="text-5xl font-extrabold text-gray-100 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Creators Love Creator Chakra
            </h2>
            <p className="text-lg text-gray-500">Real results from real creators across every niche</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.handle} · {t.followers} followers</div>
                  </div>
                  <Badge className="ml-auto bg-gray-50 text-gray-500 border-gray-100 text-xs">{t.niche}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Simple, Creator-First Pricing
            </h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when you're ready to scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 relative",
                  plan.popular
                    ? "bg-gradient-to-b from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-200"
                    : "bg-white border border-gray-100 shadow-sm"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-400 text-yellow-900 border-0 px-4 py-1 rounded-full text-xs font-bold shadow-md">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className={cn("text-sm font-semibold mb-1", plan.popular ? "text-purple-200" : "text-gray-500")}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={cn("text-4xl font-extrabold", plan.popular ? "text-white" : "text-gray-900")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {plan.price}
                  </span>
                  <span className={cn("text-sm", plan.popular ? "text-purple-200" : "text-gray-400")}>{plan.period}</span>
                </div>
                <p className={cn("text-sm mb-6", plan.popular ? "text-purple-200" : "text-gray-500")}>{plan.desc}</p>
                <div className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.popular ? "text-purple-200" : "text-purple-500")} />
                      <span className={plan.popular ? "text-white/90" : "text-gray-600"}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={cn(
                    "w-full rounded-xl h-11 font-semibold",
                    plan.popular
                      ? "bg-white text-purple-700 hover:bg-purple-50"
                      : "premium-button"
                  )}
                  asChild
                >
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Ready to Go Viral?
              </h2>
              <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ creators who use Creator Chakra to grow consistently, post strategically, and create content that actually works.
              </p>
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 rounded-2xl h-14 px-10 text-base font-bold shadow-xl" asChild>
                <Link href="/login">
                  Start for Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Creator <span className="text-gradient">Chakra</span>
              </span>
            </Link>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
            </div>
            <p className="text-sm text-gray-400">© 2026 Creator Chakra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
