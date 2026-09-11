import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Eye,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  PackageCheck,
  Search,
  Star,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Rating from "../../components/ui/Rating";

const stats = [
  {
    label: "New Leads",
    value: "8",
    icon: Search,
    description: "Needs your response",
  },
  {
    label: "Upcoming Jobs",
    value: "5",
    icon: CalendarDays,
    description: "Scheduled bookings",
  },
  {
    label: "This Month",
    value: "₹24,850",
    icon: DollarSign,
    description: "Estimated earnings",
  },
  {
    label: "Profile Views",
    value: "186",
    icon: Eye,
    description: "This month",
  },
];

const leads = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "AC Repair",
    location: "Sector 62, Noida",
    date: "Today",
    budget: "₹800 - ₹1,500",
    status: "New",
  },
  {
    id: 2,
    customer: "Priya Verma",
    service: "AC Installation",
    location: "Indirapuram, Ghaziabad",
    date: "Tomorrow",
    budget: "₹1,500 - ₹3,000",
    status: "New",
  },
  {
    id: 3,
    customer: "Aman Gupta",
    service: "AC Servicing",
    location: "Sector 18, Noida",
    date: "12 Sep",
    budget: "₹500 - ₹1,000",
    status: "Contacted",
  },
];

const upcomingJobs = [
  {
    id: 1,
    customer: "Neha Singh",
    service: "Split AC Service",
    date: "Today",
    time: "11:00 AM",
    location: "Sector 50, Noida",
    price: 899,
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Rohit Mehta",
    service: "AC Installation",
    date: "Tomorrow",
    time: "3:00 PM",
    location: "Sector 137, Noida",
    price: 2200,
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Ananya Kapoor",
    service: "AC Repair",
    date: "12 Sep",
    time: "5:30 PM",
    location: "Sector 76, Noida",
    price: 1200,
    status: "Pending",
  },
];

const recentReviews = [
  {
    id: 1,
    customer: "Vikas Jain",
    rating: 5,
    comment:
      "Very professional and quick service. The AC was fixed within an hour.",
    date: "2 days ago",
  },
  {
    id: 2,
    customer: "Simran Kaur",
    rating: 5,
    comment:
      "Good experience. Arrived on time and explained everything clearly.",
    date: "5 days ago",
  },
  {
    id: 3,
    customer: "Arjun Malhotra",
    rating: 4,
    comment:
      "Good work and reasonable pricing. Would definitely recommend.",
    date: "1 week ago",
  },
];

function StatCard({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: string;
  icon: typeof Search;
  description: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Professional Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, CoolCare Services
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your leads, bookings, services and business performance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/providers/2"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Eye className="h-4 w-4" />
              View Profile
            </Link>

            <Link
              to="/providers/2"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <UserRound className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Profile Completion */}
        <Card className="mt-8 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900">
                  Your profile is 90% complete
                </h2>

                <Badge variant="green">
                  Verified
                </Badge>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Complete your portfolio and availability to get more bookings.
              </p>
            </div>

            <Link
              to="/providers/2"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Complete profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[90%] rounded-full bg-blue-600" />
          </div>
        </Card>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            {/* New Leads */}
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    New Leads
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Customers looking for your services
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  8 new
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {lead.service}
                          </h3>

                          <Badge
                            variant={
                              lead.status === "New"
                                ? "blue"
                                : "gray"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </div>

                        <p className="mt-2 text-sm font-medium text-slate-700">
                          {lead.customer}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {lead.location}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            {lead.date}
                          </span>

                          <span>{lead.budget}</span>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Reject
                        </button>

                        <button
                          type="button"
                          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Contact
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
                  View all leads
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Card>

            {/* Upcoming Jobs */}
            <Card className="mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Upcoming Jobs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your upcoming customer appointments
                  </p>
                </div>

                <Link
                  to="/provider/dashboard"
                  className="hidden items-center gap-1 text-sm font-semibold text-blue-600 sm:flex"
                >
                  View calendar
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {upcomingJobs.map((job) => (
                  <div key={job.id} className="p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <CalendarDays className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-900">
                              {job.service}
                            </h3>

                            <Badge
                              variant={
                                job.status === "Confirmed"
                                  ? "green"
                                  : "yellow"
                              }
                            >
                              {job.status}
                            </Badge>
                          </div>

                          <p className="mt-1 text-sm text-slate-600">
                            {job.customer}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock3 className="h-4 w-4" />
                              {job.date} · {job.time}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 md:justify-end">
                        <p className="text-lg font-bold text-slate-900">
                          ₹{job.price}
                        </p>

                        <button
                          type="button"
                          aria-label="More options"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Reviews */}
            <Card className="mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    What customers are saying about you
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

                  <span className="font-bold text-slate-900">
                    4.8
                  </span>

                  <span className="text-sm text-slate-400">
                    (96 reviews)
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {review.customer}
                        </p>

                        <div className="mt-1">
                          <Rating rating={review.rating} />
                        </div>
                      </div>

                      <span className="text-xs text-slate-400">
                        {review.date}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Business Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80"
                  alt="CoolCare Services"
                  className="h-16 w-16 rounded-2xl object-cover"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="truncate font-bold text-slate-900">
                      CoolCare Services
                    </h2>

                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    AC Repair & Services
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                    <span className="font-semibold text-slate-800">
                      4.8
                    </span>

                    <span className="text-slate-400">
                      (96)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Noida, Delhi NCR
                </div>

                <div className="flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-slate-400" />
                  6+ years experience
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Identity verified
                </div>
              </div>

              <Link
                to="/providers/2"
                className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View public profile
              </Link>
            </Card>

            {/* Messages */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                  3 unread
                </span>
              </div>

              <h2 className="mt-4 font-bold text-slate-900">
                Customer Messages
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Respond quickly to customers to improve your chances of
                converting leads.
              </p>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open Messages
                <ChevronRight className="h-4 w-4" />
              </button>
            </Card>

            {/* Availability */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Availability
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Current booking status
                  </p>
                </div>

                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">
                  Accepting new bookings
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  Customers can currently find and contact your business.
                </p>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Manage Availability
              </button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="font-bold text-slate-900">
                Quick Actions
              </h2>

              <div className="mt-4 space-y-2">
                <Link
                  to="/providers/2"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Edit services & pricing
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  to="/providers/2"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Update service areas
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Add portfolio photos
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

export default ProviderDashboard;