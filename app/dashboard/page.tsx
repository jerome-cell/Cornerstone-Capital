import { DashboardLayout } from "@/components/investment-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data for dashboard
const portfolioData = {
  totalValue: 47832.5,
  dailyChange: 5284.3,
  dailyChangePercent: 12.5,
  activeInvestments: 8,
  totalInvested: 35000,
  totalProfits: 12832.5,
  expectedProfits: 18500,
}

const recentInvestments = [
  {
    id: 1,
    plan: "Premium Plan",
    amount: 15000,
    dailyRate: 4.7,
    duration: 30,
    status: "active",
    progress: 65,
    daysRemaining: 11,
  },
  {
    id: 2,
    plan: "Business Plan",
    amount: 10000,
    dailyRate: 4.0,
    duration: 15,
    status: "active",
    progress: 80,
    daysRemaining: 3,
  },
  {
    id: 3,
    plan: "Economy Plan",
    amount: 10000,
    dailyRate: 3.0,
    duration: 10,
    status: "completed",
    progress: 100,
    daysRemaining: 0,
  },
]

export default function DashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, James</h2>
            <p className="text-muted-foreground">Here's an overview of your investment portfolio performance.</p>
          </div>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            New Investment
          </Button>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{portfolioData.dailyChangePercent}% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{formatCurrency(portfolioData.dailyChange)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{portfolioData.dailyChangePercent}% vs yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.activeInvestments}</div>
              <p className="text-xs text-muted-foreground">
                {portfolioData.activeInvestments - 2} profitable, 2 at loss
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalProfits)}</div>
              <p className="text-xs text-muted-foreground">Expected: {formatCurrency(portfolioData.expectedProfits)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Investments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
            <CardDescription>Your active and recently completed investment plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvestments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{investment.plan}</p>
                      <Badge variant={investment.status === "active" ? "default" : "secondary"}>
                        {investment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(investment.amount)} • {investment.dailyRate}% daily • {investment.duration} days
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <Progress value={investment.progress} className="w-20" />
                      <span className="text-sm font-medium">{investment.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {investment.daysRemaining > 0 ? `${investment.daysRemaining} days remaining` : "Completed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <TrendingUp className="h-6 w-6" />
            <span>New Investment</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <DollarSign className="h-6 w-6" />
            <span>Deposit Funds</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <ArrowDownRight className="h-6 w-6" />
            <span>Withdraw</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <PieChart className="h-6 w-6" />
            <span>Portfolio Analysis</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
