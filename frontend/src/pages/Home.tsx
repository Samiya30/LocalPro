import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProviderCard from "../components/ui/ProviderCard";

const services = [
  {
    name: "Electrician",
    slug: "electrician",
    description: "Wiring, repairs & installations",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Plumber",
    slug: "plumber",
    description: "Leaks, pipes & plumbing repairs",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    description: "AC service, repair & installation",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Home Cleaning",
    slug: "home-cleaning",
    description: "Professional home cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    description: "Furniture & woodwork services",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8c8d0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Painter",
    slug: "painter",
    description: "Interior & exterior painting",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tutor",
    slug: "tutor",
    description: "Experienced tutors near you",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Computer Repair",
    slug: "computer-repair",
    description: "Laptop & computer support",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
  },
];

const popularServices = [
  { name: "Electrician", slug: "electrician" },
  { name: "Plumber", slug: "plumber" },
  { name: "AC Repair", slug: "ac-repair" },
  { name: "Home Cleaning", slug: "home-cleaning" },
  { name: "Carpenter", slug: "carpenter" },
];

const professionals = [
  {
    id: "1",
    name: "Apex Electricals",
    service: "Electrician",
    rating: 4.9,
    reviews: 128,
    price: 499,
    location: "Noida, Uttar Pradesh",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80",
    available: true,
    verified: true,
  },
  {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    rating: 4.8,
    reviews: 96,
    price: 599,
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=700&q=80",
    available: true,
    verified: true,
  },
  {
    id: "3",
    name: "SparkFix Home Services",
    service: "Home Repair",
    rating: 4.7,
    reviews: 84,
    price: 449,
    location: "Ghaziabad, Uttar Pradesh",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    available: false,
    verified: true,
  },
];

function Home() {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWhen, setSelectedWhen] = useState("");

  const handleSearch = () => {
    if (selectedService) {
      navigate(`/services/${selectedService}`);
      return;
    }

    navigate("/services/ac-repair");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Hero content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Trusted local professionals
              </div>

              <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
                Find trusted professionals{" "}
                <span className="text-blue-600">near you.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Compare local professionals, request quotes, and book reliable
                services in one place.
              </p>

              {/* Search box */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50">
                <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_0.8fr_auto]">
                  {/* Service */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <Wrench className="h-5 w-5 shrink-0 text-slate-400" />

                    <select
                      value={selectedService}
                      onChange={(event) =>
                        setSelectedService(event.target.value)
                      }
                      className="w-full bg-transparent text-sm text-slate-700 outline-none"
                    >
                      <option value="">What service do you need?</option>

                      {services.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <MapPin className="h-5 w-5 shrink-0 text-slate-400" />

                    <select
                      value={selectedLocation}
                      onChange={(event) =>
                        setSelectedLocation(event.target.value)
                      }
                      className="w-full bg-transparent text-sm text-slate-700 outline-none"
                    >
                      <option value="">Location</option>
                      <option value="noida">Noida</option>
                      <option value="delhi">Delhi</option>
                      <option value="gurugram">Gurugram</option>
                      <option value="ghaziabad">Ghaziabad</option>
                    </select>
                  </div>

                  {/* When */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />

                    <select
                      value={selectedWhen}
                      onChange={(event) =>
                        setSelectedWhen(event.target.value)
                      }
                      className="w-full bg-transparent text-sm text-slate-700 outline-none"
                    >
                      <option value="">When?</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="week">This week</option>
                    </select>
                  </div>

                  {/* Search button */}
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Search className="h-5 w-5" />
                    <span className="md:hidden lg:inline">Find</span>
                  </button>
                </div>
              </div>

              {/* Popular services */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>Popular:</span>

                {popularServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-200/60">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional providing home service"
                  className="h-[480px] w-full object-cover"
                />
              </div>

              {/* Verified card */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Verified professionals
                    </p>

                    <p className="text-xs text-slate-500">
                      Quality checked
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="absolute -right-4 top-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      4.9/5
                    </p>

                    <p className="text-xs text-slate-500">
                      Average rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICES SECTION
      ========================== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Explore services
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                What do you need help with?
              </h2>

              <p className="mt-2 max-w-2xl text-slate-600">
                Browse trusted professionals across popular local services.
              </p>
            </div>

            <Link
              to="/services/ac-repair"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-40 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900">
                    {service.name}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Explore
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PROFESSIONALS SECTION
      ========================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Trusted professionals
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Professionals customers love
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Discover highly rated local professionals ready to help.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {professionals.map((professional) => (
              <ProviderCard
                key={professional.id}
                provider={professional}
                variant="compact"
                showBookingButton={false}
                showFavorite
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CTA SECTION
      ========================== */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Ready to find your professional?
              </h2>

              <p className="mt-3 max-w-xl text-slate-300">
                Compare professionals, request quotes, and book your next
                service with confidence.
              </p>
            </div>

            <Link
              to="/services/ac-repair"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Find Professionals
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;