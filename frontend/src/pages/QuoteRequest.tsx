import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const providers = {
  "1": {
    id: "1",
    name: "Apex Electricals",
    service: "Electrician",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80",
    services: [
      "Electrical Repair",
      "Switch & Socket Installation",
      "Fan Installation",
      "Home Wiring",
    ],
  },

  "2": {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=700&q=80",
    services: [
      "AC Service",
      "AC Repair",
      "AC Installation",
      "AC Gas Refill",
    ],
  },

  "3": {
    id: "3",
    name: "SparkFix Home Services",
    service: "Home Repair",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    services: [
      "General Home Repair",
      "Furniture Repair",
      "Wall Repair",
      "Maintenance Visit",
    ],
  },

  "4": {
    id: "4",
    name: "HomePro Experts",
    service: "Home Services",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
    services: [
      "Home Maintenance",
      "Home Inspection",
      "Repair Visit",
      "Maintenance Package",
    ],
  },
};

function QuoteRequest() {
  const { providerId } = useParams();

  const provider =
    providers[providerId as keyof typeof providers] ??
    providers["1"];

  const [service, setService] = useState(
    provider.services[0]
  );

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    service &&
    description.trim().length >= 10 &&
    location.trim().length >= 3;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto max-w-3xl px-6 py-20">
          <Card>
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900">
                Quote request sent
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Your request has been sent to{" "}
                <span className="font-semibold text-slate-700">
                  {provider.name}
                </span>
                .
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Service
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {service}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {location}
                    </p>
                  </div>

                  {preferredDate && (
                    <div>
                      <p className="text-xs text-slate-400">
                        Preferred date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {preferredDate}
                      </p>
                    </div>
                  )}

                  {budget && (
                    <div>
                      <p className="text-xs text-slate-400">
                        Budget
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        ₹{budget}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-slate-400">
                      Request
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/customer/dashboard"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Go to Dashboard
                </Link>

                <Link
                  to={`/providers/${provider.id}`}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back to Profile
                </Link>
              </div>
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to={`/providers/${provider.id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Request a quote
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Tell us what you need
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600">
                Share the details of your project and let the
                professional provide you with a quote.
              </p>
            </div>

            <Card>
              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="text-sm font-semibold text-slate-700"
                >
                  Service
                </label>

                <select
                  id="service"
                  value={service}
                  onChange={(event) =>
                    setService(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {provider.services.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Describe the work you need
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={6}
                  placeholder="Explain the problem, work required, number of items, or any other useful details..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Minimum 10 characters
                </p>
              </div>

              {/* Location */}
              <div className="mt-6">
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-slate-700"
                >
                  Service location
                </label>

                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    placeholder="Enter your locality or full address"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Date + budget */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Preferred date
                  </label>

                  <input
                    id="preferred-date"
                    type="date"
                    value={preferredDate}
                    onChange={(event) =>
                      setPreferredDate(event.target.value)
                    }
                    min={new Date()
                      .toISOString()
                      .split("T")[0]}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Estimated budget
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      ₹
                    </span>

                    <input
                      id="budget"
                      type="number"
                      min="0"
                      value={budget}
                      onChange={(event) =>
                        setBudget(event.target.value)
                      }
                      placeholder="Optional"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Button
                  type="button"
                  fullWidth
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Quote Request
                </Button>

                {!canSubmit && (
                  <p className="mt-3 text-center text-xs text-slate-400">
                    Add a service, describe the work and provide your
                    location to continue.
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-6 space-y-5">
              <Card>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Requesting quote from
                    </p>

                    <h2 className="mt-1 font-bold text-slate-900">
                      {provider.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {provider.service}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Why request a quote?
                    </p>

                    <ul className="mt-3 space-y-2 text-xs leading-5 text-blue-700">
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Get a price based on your requirements
                      </li>

                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Discuss the work before booking
                      </li>

                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Compare quotes from professionals
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex gap-3">
                  <ClipboardList className="h-5 w-5 shrink-0 text-slate-500" />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The professional can review your request and
                      respond with pricing and additional questions.
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

export default QuoteRequest;