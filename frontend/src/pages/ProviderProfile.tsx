import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Rating from "../components/ui/Rating";
import Card from "../components/ui/Card";

const providers = {
  "1": {
    id: "1",
    name: "Apex Electricals",
    service: "Electrician",
    rating: 4.9,
    reviews: 128,
    location: "Noida, Uttar Pradesh",
    experience: "8+ years",
    responseTime: "Usually responds within 30 min",
    description:
      "Professional electrical repair, installation and home wiring services. Our experienced technicians provide reliable and safe electrical solutions for homes and businesses.",
    profileImage:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    available: true,
    serviceAreas: ["Noida", "Greater Noida", "Ghaziabad"],
    services: [
      {
        name: "Electrical Repair",
        description: "Fault finding and electrical repairs",
        price: 499,
      },
      {
        name: "Switch & Socket Installation",
        description: "Installation and replacement",
        price: 299,
      },
      {
        name: "Fan Installation",
        description: "Ceiling and exhaust fan installation",
        price: 399,
      },
      {
        name: "Home Wiring",
        description: "Electrical wiring and rewiring",
        price: 999,
      },
    ],
  },

  "2": {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    rating: 4.8,
    reviews: 96,
    location: "Delhi, India",
    experience: "6+ years",
    responseTime: "Usually responds within 1 hour",
    description:
      "Experienced AC technicians providing professional AC servicing, repair, installation and maintenance for residential and commercial customers.",
    profileImage:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    available: true,
    serviceAreas: ["Delhi", "Noida", "Ghaziabad"],
    services: [
      {
        name: "AC Service",
        description: "Complete AC cleaning and servicing",
        price: 599,
      },
      {
        name: "AC Repair",
        description: "Diagnosis and repair",
        price: 499,
      },
      {
        name: "AC Installation",
        description: "Professional AC installation",
        price: 999,
      },
      {
        name: "AC Gas Refill",
        description: "Gas refill and leak inspection",
        price: 1499,
      },
    ],
  },

  "3": {
    id: "3",
    name: "SparkFix Home Services",
    service: "Home Repair",
    rating: 4.7,
    reviews: 84,
    location: "Ghaziabad, Uttar Pradesh",
    experience: "7+ years",
    responseTime: "Usually responds within 2 hours",
    description:
      "Reliable home repair and maintenance professionals helping customers with everyday household repair and maintenance requirements.",
    profileImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    available: false,
    serviceAreas: ["Ghaziabad", "Noida", "Delhi"],
    services: [
      {
        name: "General Home Repair",
        description: "Everyday household repairs",
        price: 449,
      },
      {
        name: "Furniture Repair",
        description: "Basic furniture repair",
        price: 599,
      },
      {
        name: "Wall Repair",
        description: "Minor wall damage repair",
        price: 499,
      },
      {
        name: "Maintenance Visit",
        description: "General inspection and maintenance",
        price: 399,
      },
    ],
  },

  "4": {
    id: "4",
    name: "HomePro Experts",
    service: "Home Services",
    rating: 4.9,
    reviews: 152,
    location: "Gurugram, Haryana",
    experience: "10+ years",
    responseTime: "Usually responds within 45 min",
    description:
      "Experienced professionals providing dependable home services with transparent pricing and reliable customer support.",
    profileImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    verified: true,
    available: true,
    serviceAreas: ["Gurugram", "Delhi", "Noida"],
    services: [
      {
        name: "Home Maintenance",
        description: "General home maintenance",
        price: 549,
      },
      {
        name: "Home Inspection",
        description: "Professional home inspection",
        price: 699,
      },
      {
        name: "Repair Visit",
        description: "On-site repair consultation",
        price: 499,
      },
      {
        name: "Maintenance Package",
        description: "Comprehensive home maintenance",
        price: 1499,
      },
    ],
  },
};

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "2 days ago",
    comment:
      "Very professional and arrived on time. The issue was fixed quickly and the pricing was transparent.",
  },
  {
    id: 2,
    name: "Priya Verma",
    rating: 5,
    date: "1 week ago",
    comment:
      "Great experience. The technician explained everything clearly and completed the work perfectly.",
  },
  {
    id: 3,
    name: "Amit Singh",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Good service and professional behaviour. Would definitely consider booking again.",
  },
];

function ProviderProfile() {
  const { providerId } = useParams();

  const provider =
    providers[providerId as keyof typeof providers] ??
    providers["1"];

  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [selectedService, setSelectedService] = useState(
    provider.services[0].name
  );
  const [quoteMessage, setQuoteMessage] = useState("");

  const handleQuoteSubmit = () => {
    setQuoteSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Cover */}
      <section className="bg-white">
        <div className="h-56 w-full overflow-hidden bg-slate-200 md:h-72">
          <img
            src={provider.coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="relative pb-8">
            {/* Profile image */}
            <div className="-mt-16 flex flex-col gap-5 md:flex-row md:items-end">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-lg">
                <img
                  src={provider.profileImage}
                  alt={provider.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {provider.name}
                  </h1>

                  {provider.verified && (
                    <Badge variant="blue">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    </Badge>
                  )}
                </div>

                <p className="mt-1 font-medium text-slate-600">
                  {provider.service}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Rating
                    rating={provider.rating}
                    reviews={provider.reviews}
                  />

                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {provider.location}
                  </span>

                  <span className="text-sm text-slate-500">
                    {provider.experience}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite((favorite) => !favorite)
                  }
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite ? "fill-red-500" : ""
                    }`}
                  />

                  {isFavorite ? "Saved" : "Save"}
                </button>

                <Link
                  to={`/providers/${provider.id}/booking`}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to="/services/ac-repair"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to professionals
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div className="space-y-8">
            {/* About */}
            <Card>
              <h2 className="text-xl font-bold text-slate-900">
                About this professional
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {provider.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Verified
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Identity and profile checked
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Clock3 className="h-5 w-5 text-blue-600" />

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {provider.responseTime}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Typical response time
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Star className="h-5 w-5 text-amber-500" />

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {provider.rating}/5 rating
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Based on {provider.reviews} reviews
                  </p>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Services & pricing
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose a service to get started.
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-100">
                {provider.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {service.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div>
                        <p className="text-xs text-slate-400">
                          Starting from
                        </p>

                        <p className="font-bold text-slate-900">
                          ₹{service.price}
                        </p>
                      </div>

                      <Link
                        to={`/providers/${provider.id}/booking`}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Service areas */}
            <Card>
              <h2 className="text-xl font-bold text-slate-900">
                Service areas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                This professional currently serves:
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {provider.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    {area}
                  </span>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Customer reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    What customers say about this professional.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

                  <span className="text-lg font-bold text-slate-900">
                    {provider.rating}
                  </span>

                  <span className="text-sm text-slate-500">
                    ({provider.reviews})
                  </span>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-100">
                {reviews.map((review) => (
                  <div key={review.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {review.name}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map(
                              (_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-200"
                                  }`}
                                />
                              )
                            )}
                          </div>

                          <span className="text-xs text-slate-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right booking / quote */}
          <aside className="lg:block">
            <div className="sticky top-6 space-y-5">
              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Starting from
                    </p>

                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      ₹{Math.min(
                        ...provider.services.map(
                          (service) => service.price
                        )
                      )}
                    </p>
                  </div>

                  {provider.available ? (
                    <Badge variant="green">Available</Badge>
                  ) : (
                    <Badge variant="gray">Currently busy</Badge>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to={`/providers/${provider.id}/booking`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Book Now
                  </Link>

                  <Link
                      to={`/providers/${provider.id}/quote`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Send className="h-4 w-4" />
                      Request a Quote
                    </Link>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message Professional
                  </button>
                </div>
              </Card>

              {/* Quote form */}
              {showQuoteForm && (
                <Card>
                  {quoteSent ? (
                    <div className="py-5 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                        <Check className="h-6 w-6 text-emerald-600" />
                      </div>

                      <h3 className="mt-4 font-bold text-slate-900">
                        Quote request sent
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Your request has been submitted to{" "}
                        {provider.name}. The professional can respond
                        with a quote.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-bold text-slate-900">
                        Request a quote
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Tell the professional what you need.
                      </p>

                      <div className="mt-5">
                        <label className="text-sm font-semibold text-slate-700">
                          Service
                        </label>

                        <select
                          value={selectedService}
                          onChange={(event) =>
                            setSelectedService(event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          {provider.services.map((service) => (
                            <option
                              key={service.name}
                              value={service.name}
                            >
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4">
                        <label className="text-sm font-semibold text-slate-700">
                          What do you need?
                        </label>

                        <textarea
                          value={quoteMessage}
                          onChange={(event) =>
                            setQuoteMessage(event.target.value)
                          }
                          rows={4}
                          placeholder="Describe the work you need..."
                          className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <Button
                        type="button"
                        fullWidth
                        onClick={handleQuoteSubmit}
                        className="mt-4"
                      >
                        Send Quote Request
                      </Button>
                    </>
                  )}
                </Card>
              )}

              {/* Trust */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Book with confidence
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      LocalPro helps you compare verified professionals,
                      reviews, pricing and availability before booking.
                    </p>
                  </div>
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

export default ProviderProfile;