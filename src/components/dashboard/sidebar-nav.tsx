"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard, Brain, Calendar, BarChart3, Users, TrendingUp,
  PieChart, Mic, Palette, Rocket, Settings, Sparkles,
  ChevronRight, Bell, Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mainNav = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard", badge: null },
  { name: "ChakraBrain", icon: Brain, href: "/dashboard/chakrabrain", badge: "AI" },
  { name: "ChakraFlow", icon: Calendar, href: "/dashboard/chakraflow", badge: null },
  { name: "ChakraScore", icon: BarChart3, href: "/dashboard/chakrascore", badge: null },
  { name: "ChakraConnect", icon: Users, href: "/dashboard/chakraconnect", badge: null },
  { name: "ChakraTrend", icon: TrendingUp, href: "/dashboard/chakratrend", badge: "Live" },
]

const insightNav = [
  { name: "ChakraAudience", icon: PieChart, href: "/dashboard/chakraaudience", badge: null },
  { name: "ChakraVoice", icon: Mic, href: "/dashboard/chakravoice", badge: null },
  { name: "ChakraBrand", icon: Palette, href: "/dashboard/chakrabrand", badge: null },
  { name: "ChakraGrowth", icon: Rocket, href: "/dashboard/chakragrowth", badge: null },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-gray-100 bg-white">
      {/* Header */}
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md shadow-purple-200 shrink-0"
          >
            <Sparkles className="text-white w-4 h-4" />
          </motion.div>
          <span
            className="font-bold text-lg text-gray-900 group-data-[collapsible=icon]:hidden"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Creator <span className="text-gradient">Chakra</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-1">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="chakra-section-title group-data-[collapsible=icon]:hidden">
            Core Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainNav.map((item) => {
                const active = isActive(item.href)
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.name}
                      className={cn(
                        "h-10 rounded-xl transition-all duration-150 relative",
                        active
                          ? "bg-purple-50 text-purple-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-purple-600" : "")} />
                        <span className="text-sm">{item.name}</span>
                        {item.badge && (
                          <span className={cn(
                            "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full group-data-[collapsible=icon]:hidden",
                            item.badge === "Live" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
                          )}>
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-600 rounded-r-full"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Insights Navigation */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="chakra-section-title group-data-[collapsible=icon]:hidden">
            Insights
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {insightNav.map((item) => {
                const active = isActive(item.href)
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.name}
                      className={cn(
                        "h-10 rounded-xl transition-all duration-150 relative",
                        active
                          ? "bg-purple-50 text-purple-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-purple-600" : "")} />
                        <span className="text-sm">{item.name}</span>
                        {active && (
                          <motion.div
                            layoutId="sidebar-active-insight"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-600 rounded-r-full"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                  className="h-10 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150"
                >
                  <Link href="/dashboard/settings" className="flex items-center gap-3">
                    <Settings className="w-4 h-4 shrink-0" />
                    <span className="text-sm">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - User Profile */}
      <SidebarFooter className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8 border border-gray-200 shrink-0">
            <AvatarImage src="https://picsum.photos/seed/creator1/40/40" />
            <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-bold">PS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold text-gray-900 truncate">Priya Sharma</div>
            <div className="text-xs text-purple-600 font-medium">Creator Plan</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
