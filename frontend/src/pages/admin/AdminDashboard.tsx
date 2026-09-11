import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Flag,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Star,
  Users,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const stats = [
  {
    label: "Total Users",
    value: "12,480",
    change: "+8.4%",
    icon: Users,
  },
  {
    label: "Service Providers",
    value: "3,842",
    change: "+12.2%",
    icon: UserRoundCheck,
  },
  {
    label: "Active Bookings",
    value: "1,286",
    change: "+6.8%",
    icon: FileText,
  },
  {
    label: "Platform Revenue",
    value: "₹4.82L",
    change: "+14.5%",
    icon: BarChart3,
  },
];

const verificationRequests = [
  {
    id: 1,
    name: "Rajesh Kumar",
    business: "Rajesh Electrical Services",
    category: "Electrician",
    location: "Noida",
    submitted: "2 hours ago",
    documents: "4 documents",
  },
  {
    id: 2,
    name: "Mohit Sharma",
    business: "Sharma Plumbing Solutions",
    category: "Plumber",
    location: "Delhi",
    submitted: "5 hours ago",
    documents: "3 documents",
  },
  {
    id: 3,
    name: "Pooja Verma",
    business: "CleanPro Services",
    category: "Home Cleaning",
    location: "Ghaziabad",
    submitted: "Yesterday",
    documents: "5 documents",
  },
];

const recentBookings = [
  {
    id: "LP-10284",
    customer: "Ananya Kapoor",
    provider: "CoolCare Services",
    service: "AC Repair",
    amount: "₹1,200",
    status: "Confirmed",
    date: "Today, 10:30 AM",
  },
  {
    id: "LP-10283",
    customer: "Rohan Mehta",
    provider: "Apex Electricals",
    service: "Electrical Repair",
    amount: "₹899",
    status: "Completed",
    date: "Today, 9:15 AM",
  },
  {
    id: "LP-10282",
    customer: "Priya Singh",
    provider: "SparkFix Home Services",
    service: "Home Repair",
    amount: "₹1,500",
    status: "Pending",
    date: "Yesterday, 6:40 PM",
  },
  {
    id: "LP-10281",
    customer: "Vikas Jain",
    provider: "HomePro Services",
    service: "Plumbing",
    amount: "₹750",
    status: "Completed",
    date: "Yesterday, 4:20 PM",
  },
];

const reports = [
  {
    id: 1,
    type: "Provider Report",
    title: "Incorrect pricing information",
    reporter: "Rahul Sharma",
    priority: "Medium",
    time: "1 hour ago",
  },
  {
    id: 2,
    type: "Booking Dispute",
    title: "Service not completed",
    reporter: "Neha Singh",
    priority: "High",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "Review Report",
    title: "Inappropriate review content",
    reporter: "CoolCare Services",
    priority: "Low",
    time: "Yesterday",
  },
];

function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof Users;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs font-semibold text-emerald-600">
            {change} this month
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor LocalPro users, providers, bookings and platform activity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Alerts */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-amber-400 p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  12 pending verifications
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Providers are waiting for approval.
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-red-400 p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  4 open disputes
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Customer issues need attention.
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-blue-400 p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Flag className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  7 reported items
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Reports are waiting for review.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {/* Provider Verification */}
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Provider Verification
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review professionals waiting for approval.
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  12 pending
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {verificationRequests.map((request) => (
                  <div key={request.id} className="p-6">
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <UserRoundCheck className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-900">
                              {request.name}
                            </h3>

                            <Badge variant="yellow">
                              Pending
                            </Badge>
                          </div>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {request.business}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                            <span>{request.category}</span>
                            <span>{request.location}</span>
                            <span>{request.documents}</span>
                            <span>{request.submitted}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-5 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all verification requests
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Card>

            {/* Recent Bookings */}
            <Card className="mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Bookings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest activity across the marketplace.
                  </p>
                </div>

                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 text-sm font-semibold text-blue-600"
                >
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-6 py-4 font-semibold">
                        Booking
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Customer
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Provider
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Amount
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {booking.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {booking.service}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {booking.customer}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {booking.provider}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                          {booking.amount}
                        </td>

                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              booking.status === "Completed"
                                ? "green"
                                : booking.status === "Confirmed"
                                  ? "blue"
                                  : "yellow"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            aria-label={`View ${booking.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Reports */}
            <Card className="mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Reports & Disputes
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Issues that require administrator attention.
                  </p>
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  7 open
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <div key={report.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          <Flag className="h-4 w-4" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              {report.type}
                            </p>

                            <Badge
                              variant={
                                report.priority === "High"
                                  ? "red"
                                  : report.priority === "Medium"
                                    ? "yellow"
                                    : "gray"
                              }
                            >
                              {report.priority}
                            </Badge>
                          </div>

                          <h3 className="mt-1 font-bold text-slate-900">
                            {report.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Reported by {report.reporter} · {report.time}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="More options"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-5 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Manage all reports
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Platform Health */}
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Platform Health
                  </h2>

                  <p className="text-xs text-slate-500">
                    Current marketplace status
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-sm font-bold text-emerald-800">
                    All systems operational
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-700">
                  Authentication, bookings, messaging and marketplace services
                  are running normally.
                </p>
              </div>
            </Card>

            {/* Provider Rating */}
            <Card className="p-6">
              <h2 className="font-bold text-slate-900">
                Marketplace Quality
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
                  <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    4.72
                  </p>

                  <p className="text-sm text-slate-500">
                    Average provider rating
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-500">
                      5 star
                    </span>

                    <span className="font-semibold text-slate-700">
                      78%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[78%] rounded-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-500">
                      4 star
                    </span>

                    <span className="font-semibold text-slate-700">
                      15%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[15%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-500">
                      3 star or lower
                    </span>

                    <span className="font-semibold text-slate-700">
                      7%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[7%] rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="font-bold text-slate-900">
                Admin Tools
              </h2>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Manage users
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Manage categories
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Manage service areas
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Platform settings
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;