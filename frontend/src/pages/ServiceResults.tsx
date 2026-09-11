import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProviderCard from "../components/ui/ProviderCard";

const categoryNames: Record<string, string> = {
  electrician: "Electrician",
  plumber: "Plumber",
  "ac-repair": "AC Repair",
  "home-cleaning": "Home Cleaning",
  carpenter: "Carpenter",
  painter: "Painter",
  tutor: "Tutor",
  "computer-repair": "Computer Repair",
};

const providers = [
  {
    id: "1",
    name: "Apex Electricals",
    service: "Electrician",
    rating: 4.9,
    reviews: 128,
    price: 499,
    location: "Noida, Uttar Pradesh",
    distance: "2.4 km",
    available: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80",
    description:
      "Professional electrical repairs, installations and home wiring services.",
  },
  {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    rating: 4.8,
    reviews: 96,
    price: 599,
    location: "Delhi, India",
    distance: "4.1 km",
    available: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=700&q=80",
    description:
      "AC servicing, repair and installation from experienced technicians.",
  },
  {
    id: "3",
    name: "SparkFix Home Services",
    service: "Home Repair",
    rating: 4.7,
    reviews: 84,
    price: 449,
    location: "Ghaziabad, Uttar Pradesh",
    distance: "6.2 km",
    available: false,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    description:
      "Reliable home repair and maintenance services for everyday problems.",
  },
  {
    id: "4",
    name: "HomePro Experts",
    service: "Home Services",
    rating: 4.9,
    reviews: 152,
    price: 549,
    location: "Gurugram, Haryana",
    distance: "8.7 km",
    available: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
    description:
      "Experienced professionals offering dependable home services.",
  },
];

type SortOption = "recommended" | "rating" | "price-low" | "price-high";

function ServiceResults() {
  const { slug } = useParams();

  const serviceName =
    categoryNames[slug ?? ""] ?? "Local Services";

  const [searchText, setSearchText] = useState(serviceName);
  const [location, setLocation] = useState("Noida");

  const [priceFilter, setPriceFilter] = useState("Any price");
  const [minimumRating, setMinimumRating] = useState<number | null>(
    null
  );
  const [availableToday, setAvailableToday] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const [sortBy, setSortBy] =
    useState<SortOption>("recommended");

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] =
    useState(false);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    const search = searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((provider) => {
        return (
          provider.name.toLowerCase().includes(search) ||
          provider.service.toLowerCase().includes(search) ||
          provider.description.toLowerCase().includes(search)
        );
      });
    }

    if (location.trim()) {
      const selectedLocation = location.trim().toLowerCase();

      result = result.filter((provider) =>
        provider.location.toLowerCase().includes(selectedLocation)
      );
    }

    if (priceFilter === "Under ₹500") {
      result = result.filter((provider) => provider.price < 500);
    }

    if (priceFilter === "₹500 - ₹1,000") {
      result = result.filter(
        (provider) =>
          provider.price >= 500 && provider.price <= 1000
      );
    }

    if (priceFilter === "Above ₹1,000") {
      result = result.filter((provider) => provider.price > 1000);
    }

    if (minimumRating !== null) {
      result = result.filter(
        (provider) => provider.rating >= minimumRating
      );
    }

    if (availableToday) {
      result = result.filter((provider) => provider.available);
    }

    if (verifiedOnly) {
      result = result.filter((provider) => provider.verified);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    return result;
  }, [
    searchText,
    location,
    priceFilter,
    minimumRating,
    availableToday,
    verifiedOnly,
    sortBy,
  ]);

  const clearFilters = () => {
    setPriceFilter("Any price");
    setMinimumRating(null);
    setAvailableToday(false);
    setVerifiedOnly(true);
  };

  const hasActiveFilters =
    priceFilter !== "Any price" ||
    minimumRating !== null ||
    availableToday ||
    !verifiedOnly;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =========================
          SEARCH HEADER
      ========================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Find professionals
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {serviceName} professionals near you
              </h1>

              <p className="mt-2 text-slate-600">
                Compare verified professionals, ratings, pricing, and
                availability.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <MapPin className="h-4 w-4" />
                Noida
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <CalendarDays className="h-4 w-4" />
                Any time
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                <Search className="h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  placeholder="Search service or professional"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                <MapPin className="h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Enter location"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RESULTS
      ========================== */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredProviders.length}
              </span>{" "}
              professionals
            </p>
          </div>

          <div className="flex gap-3">
            {/* Mobile filters */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowSortMenu((open) => !open)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Sort
                <ChevronDown className="h-4 w-4" />
              </button>

              {showSortMenu && (
                <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                  {[
                    {
                      value: "recommended" as SortOption,
                      label: "Recommended",
                    },
                    {
                      value: "rating" as SortOption,
                      label: "Highest rated",
                    },
                    {
                      value: "price-low" as SortOption,
                      label: "Price: Low to High",
                    },
                    {
                      value: "price-high" as SortOption,
                      label: "Price: High to Low",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                        sortBy === option.value
                          ? "bg-blue-50 font-semibold text-blue-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* =========================
              FILTER SIDEBAR
          ========================== */}
          <aside className="hidden lg:block">
            <FilterPanel
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              minimumRating={minimumRating}
              setMinimumRating={setMinimumRating}
              availableToday={availableToday}
              setAvailableToday={setAvailableToday}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </aside>

          {/* =========================
              PROVIDER RESULTS
          ========================== */}
          <div className="space-y-5">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  variant="default"
                  showBookingButton
                  showFavorite
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  No professionals found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try changing your search, location, or filters to
                  find more professionals.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchText(serviceName);
                    setLocation("");
                    clearFilters();
                  }}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* =========================
          MOBILE FILTER DRAWER
      ========================== */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-slate-900/40"
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <FilterPanel
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                minimumRating={minimumRating}
                setMinimumRating={setMinimumRating}
                availableToday={availableToday}
                setAvailableToday={setAvailableToday}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />

              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Show {filteredProviders.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

interface FilterPanelProps {
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  minimumRating: number | null;
  setMinimumRating: (value: number | null) => void;
  availableToday: boolean;
  setAvailableToday: (value: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

function FilterPanel({
  priceFilter,
  setPriceFilter,
  minimumRating,
  setMinimumRating,
  availableToday,
  setAvailableToday,
  verifiedOnly,
  setVerifiedOnly,
  hasActiveFilters,
  clearFilters,
}: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />

          <h2 className="font-bold text-slate-900">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {/* Price */}
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Price
          </p>

          <div className="mt-3 space-y-2">
            {[
              "Any price",
              "Under ₹500",
              "₹500 - ₹1,000",
              "Above ₹1,000",
            ].map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === option}
                  onChange={() => setPriceFilter(option)}
                  className="h-4 w-4 accent-blue-600"
                />

                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold text-slate-900">
            Minimum rating
          </p>

          <div className="mt-3 space-y-2">
            {[
              { value: 4.5, label: "4.5+" },
              { value: 4.0, label: "4.0+" },
              { value: 3.5, label: "3.5+" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minimumRating === option.value}
                  onChange={() =>
                    setMinimumRating(option.value)
                  }
                  className="h-4 w-4 accent-blue-600"
                />

                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                {option.label}
              </label>
            ))}

            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
              <input
                type="radio"
                name="rating"
                checked={minimumRating === null}
                onChange={() => setMinimumRating(null)}
                className="h-4 w-4 accent-blue-600"
              />

              Any rating
            </label>
          </div>
        </div>

        {/* Availability */}
        <div className="border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold text-slate-900">
            Availability
          </p>

          <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={availableToday}
              onChange={(event) =>
                setAvailableToday(event.target.checked)
              }
              className="h-4 w-4 rounded accent-blue-600"
            />

            Available today
          </label>
        </div>

        {/* Verified */}
        <div className="border-t border-slate-100 pt-5">
          <p className="text-sm font-semibold text-slate-900">
            Verified only
          </p>

          <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(event) =>
                setVerifiedOnly(event.target.checked)
              }
              className="h-4 w-4 rounded accent-blue-600"
            />

            Verified professionals
          </label>
        </div>
      </div>
    </div>
  );
}

export default ServiceResults;