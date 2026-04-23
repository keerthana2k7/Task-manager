import { AppLayout } from "@/components/AppLayout";
import { ClipboardList, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const stats = [
  { label: "Total Tasks", value: 48, icon: ClipboardList, color: "text-primary", bg: "bg-accent" },
  { label: "Completed", value: 32, icon: CheckCircle2, color: "text-priority-low", bg: "bg-emerald-50" },
  { label: "Pending", value: 16, icon: Clock, color: "text-priority-medium", bg: "bg-amber-50" },
  { label: "Completion", value: "67%", icon: TrendingUp, color: "text-primary", bg: "bg-accent" },
];

const weeklyData = [
  { name: "Week 1", completed: 10, pending: 3 },
  { name: "Week 2", completed: 8, pending: 5 },
  { name: "Week 3", completed: 7, pending: 4 },
  { name: "Week 4", completed: 7, pending: 4 },
];

const dailyTrend = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 6 },
  { day: "Wed", tasks: 3 },
  { day: "Thu", tasks: 8 },
  { day: "Fri", tasks: 5 },
  { day: "Sat", tasks: 2 },
  { day: "Sun", tasks: 1 },
];

const pieData = [
  { name: "Completed", value: 32 },
  { name: "Pending", value: 16 },
];

const PIE_COLORS = ["hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)"];

const MonthlyReport = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Monthly Report</h1>
          <p className="text-muted-foreground text-sm mt-1">April 2026 overview</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-card rounded-xl border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <div className={cn("p-2 rounded-lg", s.bg)}>
                  <s.icon className={cn("h-4 w-4", s.color)} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2 animate-count-up" style={{ animationDelay: `${i * 100 + 200}ms` }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="bg-card rounded-xl border p-5 shadow-sm lg:col-span-3 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="text-sm font-semibold mb-4">Weekly Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid hsl(220,15%,90%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="completed" fill="hsl(230,70%,55%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(38,92%,50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border p-5 shadow-sm lg:col-span-2 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <h3 className="text-sm font-semibold mb-4">Completion Ratio</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={400}
                  animationDuration={800}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid hsl(220,15%,90%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs mt-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-priority-low" />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-priority-medium" />
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Daily Trend */}
        <div className="bg-card rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <h3 className="text-sm font-semibold mb-4">Daily Task Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(220,15%,90%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="hsl(230,70%,55%)"
                fill="hsl(230,70%,90%)"
                strokeWidth={2}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
};

export default MonthlyReport;
