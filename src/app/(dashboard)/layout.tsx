import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-gray-50/50 min-h-screen">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}