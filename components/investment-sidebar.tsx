"use client"

import type * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LineChartIcon as ChartLine,
  Wallet,
  PieChart,
  ArrowLeftRight,
  User,
  Settings,
  Home,
  LogOut,
  Bell,
  Shield,
  CreditCard,
  TrendingUp,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock user data - replace with your actual user context/auth
const userData = {
  name: "James Mitchell",
  email: "james.mitchell@email.com",
  avatar: "/placeholder.svg?height=40&width=40",
  walletId: "CCS-A8B9C2D1",
  walletBalance: 47832.5,
  walletBalanceBTC: 1.28456789,
  plan: "Premium",
  lastLogin: "19/07/2025 09:15 GMT",
}

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: ChartLine,
        badge: null,
      },
      {
        title: "Wallet",
        url: "/dashboard/wallet",
        icon: Wallet,
        badge: null,
      },
      {
        title: "Investments",
        url: "/dashboard/investments",
        icon: PieChart,
        badge: "8",
      },
      {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ArrowLeftRight,
        badge: null,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
        badge: null,
      },
      {
        title: "Security",
        url: "/dashboard/security",
        icon: Shield,
        badge: null,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        badge: null,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "Homepage",
        url: "/",
        icon: Home,
        badge: null,
      },
      {
        title: "Investment Plans",
        url: "/plans",
        icon: TrendingUp,
        badge: null,
      },
      {
        title: "Market Data",
        url: "/market",
        icon: Building2,
        badge: null,
      },
    ],
  },
]

// Company contact information
const contactInfo = [
  {
    icon: MapPin,
    text: "25 Canada Square, Canary Wharf",
  },
  {
    icon: Phone,
    text: "+44 20 7946 0958",
  },
  {
    icon: Mail,
    text: "support@cornerstonecapital.com",
  },
]

export function InvestmentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...")
    router.push("/login")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatBTC = (amount: number) => {
    return `${amount.toFixed(8)} BTC`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Cornerstone Capital</span>
            <span className="truncate text-xs text-muted-foreground">Investment Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userData.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{userData.email}</p>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Wallet ID</span>
                  <Badge variant="outline" className="text-xs">
                    {userData.walletId}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Balance</span>
                    <span className="text-sm font-semibold">{formatCurrency(userData.walletBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">BTC</span>
                    <span className="text-xs font-mono">{formatBTC(userData.walletBalanceBTC)}</span>
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* Navigation Menu */}
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <Separator />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2 space-y-2">
              <Button size="sm" className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="size-4 mr-2" />
                Deposit Funds
              </Button>
              <Button size="sm" className="w-full justify-start bg-transparent" variant="outline">
                <ArrowLeftRight className="size-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Contact Information */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-4 py-3 space-y-2">
              <div className="text-xs font-medium text-muted-foreground mb-2">Contact Support</div>
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <contact.icon className="size-3" />
                  <span className="truncate">{contact.text}</span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* User Actions */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-4 py-2 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Last login</span>
                <span>{userData.lastLogin}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="size-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

// Layout component that includes the sidebar
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <InvestmentSidebar />
      <main className="flex-1 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Investment Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="size-4" />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
