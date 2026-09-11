import {
  CheckCircle2,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface ProviderCardData {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  distance?: string;
  available?: boolean;
  verified?: boolean;
  image: string;
  description?: string;
}

interface ProviderCardProps {
  provider: ProviderCardData;
  variant?: "default" | "compact";
  showBookingButton?: boolean;
  showFavorite?: boolean;
}

function ProviderCard({
  provider,
  variant = "default",
  showBookingButton = true,
  showFavorite = false,
}: ProviderCardProps) {
  if (variant === "compact") {
    return (
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={provider.image}
            alt={provider.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />

          {provider.verified && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </span>
          )}

          {showFavorite && (
            <button
              type="button"
              aria-label={`Save ${provider.name}`}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm transition hover:text-red-500"
            >
              <Heart className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-bold text-slate-900">
                {provider.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {provider.service}
              </p>
            </div>

            {provider.available && (
              <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Available
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {provider.rating.toFixed(1)}
            </div>

            <span className="text-sm text-slate-400">
              ({provider.reviews})
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">
                Starting from
              </p>

              <p className="text-lg font-bold text-slate-900">
                ₹{provider.price}
              </p>
            </div>

            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              {provider.location}
            </span>
          </div>

          <Link
            to={`/providers/${provider.id}`}
            className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Profile
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-56 w-full shrink-0 bg-slate-100 md:h-auto md:w-64">
          <img
            src={provider.image}
            alt={provider.name}
            className="h-full w-full object-cover"
          />

          {provider.verified && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </span>
          )}

          {showFavorite && (
            <button
              type="button"
              aria-label={`Save ${provider.name}`}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm transition hover:text-red-500"
            >
              <Heart className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {provider.name}
                </h2>

                {provider.available && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Available
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {provider.service}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs text-slate-400">
                Starting from
              </p>

              <p className="text-xl font-bold text-slate-900">
                ₹{provider.price}
              </p>
            </div>
          </div>

          {provider.description && (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {provider.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

              <span className="font-semibold text-slate-800">
                {provider.rating.toFixed(1)}
              </span>

              ({provider.reviews})
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {provider.location}
            </span>

            {provider.distance && (
              <span>{provider.distance}</span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/providers/${provider.id}`}
              className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Profile
            </Link>

            {showBookingButton && (
              <Link
                to={`/providers/${provider.id}/booking`}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProviderCard;