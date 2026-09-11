import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
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

const upcomingBookings = [
  {
    id: "LP-1001",
    providerId: "1",
    provider: "Apex Electricals",
    service: "Electrical Repair",
    date: "10 Sep 2026",
    time: "10:00 AM",
    location: "Noida, Uttar Pradesh",
    price: 499,
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "LP-1002",
    providerId: "2",
    provider: "CoolCare Services",
    service: "AC Service",
    date: "14 Sep 2026",
    time: "02:00 PM",
    location: "Delhi, India",
    price: 599,
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=500&q=80",
  },
];

const quoteRequests = [
  {
    id: "QR-2001",
    providerId: "3",
    provider: "SparkFix Home Services",
    service: "General Home Repair",
    requestedOn: "5 Sep 2026",
    status: "Awaiting response",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "QR-2002",
    providerId: "4",
    provider: "HomePro Experts",
    service: "Home Maintenance",
    requestedOn: "3 Sep 2026",
    status: "Quote received",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80",
  },
];

const favorites = [
  {
    id: "1",
    name: "Apex Electricals",
    service: "Electrician",
    rating: 4.9,
    reviews: 128,
    price: 499,
    location: "Noida",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    rating: 4.8,
    reviews: 96,
    price: 599,
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=500&q=80",
  },
];

const recentBookings = [
  {
    id: "LP-0987",
    provider: "Apex Electricals",
    service: "Fan Installation",
    date: "28 Aug 2026",
    price: 399,
    status: "Completed",
    rating: 5,
  },
  {
    id: "LP-0971",
    provider: "CoolCare Services",
    service: "AC Repair",
    date: "20 Aug 2026",
    price: 499,
    status: "Completed",
    rating: 5,
  },
  {
    id: "LP-0954",
    provider: "SparkFix Home Services",
    service: "Wall Repair",
    date: "12 Aug 2026",
    price: 499,
    status: "Completed",
    rating: 4,
  },
];

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* =========================
            HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Customer dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back!
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your bookings, quote requests and favorite
              professionals.
            </p>
          </div>

          <Link
            to="/services/ac-repair"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Search className="h-4 w-4" />
            Find a Professional
          </Link>
        </div>

        {/* =========================
            STATS
        ========================== */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Upcoming bookings"
            value="2"
          />

          <StatCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Pending requests"
            value="1"
          />

          <StatCard
            icon={<Heart className="h-5 w-5" />}
            label="Saved professionals"
            value="6"
          />

          <StatCard
            icon={<PackageCheck className="h-5 w-5" />}
            label="Completed services"
            value="14"
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* =========================
              MAIN CONTENT
          ========================== */}
          <div className="space-y-8">
            {/* Upcoming bookings */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Upcoming bookings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your scheduled services.
                  </p>
                </div>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} padding="none">
                    <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
                      <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 md:w-28">
                        <img
                          src={booking.image}
                          alt={booking.provider}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {booking.provider}
                          </h3>

                          {booking.status === "Confirmed" ? (
                            <Badge variant="green">
                              {booking.status}
                            </Badge>
                          ) : (
                            <Badge variant="yellow">
                              {booking.status}
                            </Badge>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-600">
                          {booking.service}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {booking.date}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {booking.time}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {booking.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 md:flex-col md:items-end">
                        <div>
                          <p className="text-xs text-slate-400">
                            Total
                          </p>

                          <p className="text-lg font-bold text-slate-900">
                            ₹{booking.price}
                          </p>
                        </div>

                        <Link
                          to={`/providers/${booking.providerId}/booking`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quote requests */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Quote requests
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track quotes you've requested.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {quoteRequests.map((request) => (
                  <Card key={request.id}>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={request.image}
                          alt={request.provider}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {request.provider}
                          </h3>

                          {request.status === "Quote received" ? (
                            <Badge variant="green">
                              {request.status}
                            </Badge>
                          ) : (
                            <Badge variant="yellow">
                              {request.status}
                            </Badge>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-slate-600">
                          {request.service}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          Requested {request.requestedOn}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      {request.price ? (
                        <div>
                          <p className="text-xs text-slate-400">
                            Quote
                          </p>

                          <p className="font-bold text-slate-900">
                            ₹{request.price}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400">
                          Waiting for professional
                        </p>
                      )}

                      <Link
                        to={`/providers/${request.providerId}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent bookings */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Recent bookings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your recently completed services.
                </p>
              </div>

              <Card padding="none">
                <div className="divide-y divide-slate-100">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {booking.service}
                          </h3>

                          <Badge variant="green">
                            {booking.status}
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          {booking.provider}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {booking.date}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-6 sm:justify-end">
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            ₹{booking.price}
                          </p>

                          <div className="mt-1 flex items-center justify-end gap-1">
                            {Array.from({ length: 5 }).map(
                              (_, index) => (
                                <Star
                                  key={index}
                                  className={`h-3.5 w-3.5 ${
                                    index < booking.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-200"
                                  }`}
                                />
                              )
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>

          {/* =========================
              SIDEBAR
          ========================== */}
          <aside className="space-y-5">
            {/* Profile */}
            <Card>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                  <UserRound className="h-6 w-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Your account
                  </p>

                  <h2 className="font-bold text-slate-900">
                    Customer
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    customer@example.com
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Edit Profile
              </button>
            </Card>

            {/* Favorites */}
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Favorites
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Professionals you've saved.
                  </p>
                </div>

                <Heart className="h-5 w-5 text-red-500" />
              </div>

              <div className="mt-5 space-y-4">
                {favorites.map((favorite) => (
                  <Link
                    key={favorite.id}
                    to={`/providers/${favorite.id}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {favorite.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {favorite.service}
                      </p>

                      <div className="mt-1">
                        <Rating
                          rating={favorite.rating}
                          reviews={favorite.reviews}
                        />
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>

              <Link
                to="/services/ac-repair"
                className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Find More Professionals
              </Link>
            </Card>

            {/* Help */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <p className="text-sm font-bold text-blue-900">
                    Need help?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Contact support if you have an issue with a
                    booking or professional.
                  </p>

                  <button
                    type="button"
                    className="mt-3 text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    Contact Support →
                  </button>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Book with confidence
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Compare ratings, reviews and verified professionals
                    before making your booking.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default CustomerDashboard;