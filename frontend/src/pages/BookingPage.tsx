import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
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
      {
        name: "Electrical Repair",
        price: 499,
      },
      {
        name: "Switch & Socket Installation",
        price: 299,
      },
      {
        name: "Fan Installation",
        price: 399,
      },
      {
        name: "Home Wiring",
        price: 999,
      },
    ],
  },

  "2": {
    id: "2",
    name: "CoolCare Services",
    service: "AC Repair",
    image:
      "https://images.unsplash.com/photo-1631545806609-5e0f3c1f7b9f?auto=format&fit=crop&w=700&q=80",
    services: [
      {
        name: "AC Service",
        price: 599,
      },
      {
        name: "AC Repair",
        price: 499,
      },
      {
        name: "AC Installation",
        price: 999,
      },
      {
        name: "AC Gas Refill",
        price: 1499,
      },
    ],
  },

  "3": {
    id: "3",
    name: "SparkFix Home Services",
    service: "Home Repair",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    services: [
      {
        name: "General Home Repair",
        price: 449,
      },
      {
        name: "Furniture Repair",
        price: 599,
      },
      {
        name: "Wall Repair",
        price: 499,
      },
      {
        name: "Maintenance Visit",
        price: 399,
      },
    ],
  },

  "4": {
    id: "4",
    name: "HomePro Experts",
    service: "Home Services",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
    services: [
      {
        name: "Home Maintenance",
        price: 549,
      },
      {
        name: "Home Inspection",
        price: 699,
      },
      {
        name: "Repair Visit",
        price: 499,
      },
      {
        name: "Maintenance Package",
        price: 1499,
      },
    ],
  },
};

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

function BookingPage() {
  const { providerId } = useParams();

  const provider =
    providers[providerId as keyof typeof providers] ??
    providers["1"];

  const [selectedService, setSelectedService] = useState(
    provider.services[0].name
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const selectedServiceData = useMemo(() => {
    return (
      provider.services.find(
        (service) => service.name === selectedService
      ) ?? provider.services[0]
    );
  }, [provider.services, selectedService]);

  const canConfirm =
    selectedService &&
    selectedDate &&
    selectedTime &&
    address.trim().length > 0;

  const handleConfirmBooking = () => {
    if (!canConfirm) {
      return;
    }

    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto flex max-w-3xl px-6 py-20">
          <Card className="w-full">
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900">
                Booking request confirmed
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Your booking request has been submitted to{" "}
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
                      {selectedService}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Address
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {address}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Estimated price
                      </span>

                      <span className="text-lg font-bold text-slate-900">
                        ₹{selectedServiceData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/customer/dashboard"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Go to My Bookings
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
        {/* Back */}
        <Link
          to={`/providers/${provider.id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* =========================
              BOOKING FORM
          ========================== */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Book a service
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Schedule your service
              </h1>

              <p className="mt-2 text-slate-600">
                Choose a service, date and time that works for you.
              </p>
            </div>

            {/* Provider */}
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
                  <h2 className="font-bold text-slate-900">
                    {provider.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {provider.service}
                  </p>
                </div>
              </div>
            </Card>

            {/* Service */}
            <Card>
              <h2 className="text-lg font-bold text-slate-900">
                1. Choose a service
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the service you want to book.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {provider.services.map((service) => {
                  const isSelected =
                    selectedService === service.name;

                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() =>
                        setSelectedService(service.name)
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {service.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Professional service
                          </p>
                        </div>

                        <p className="font-bold text-slate-900">
                          ₹{service.price}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Date */}
            <Card>
              <h2 className="text-lg font-bold text-slate-900">
                2. Choose date
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select when you'd like the professional to visit.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="booking-date"
                  className="text-sm font-semibold text-slate-700"
                >
                  Service date
                </label>

                <div className="relative mt-2">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    onChange={(event) =>
                      setSelectedDate(event.target.value)
                    }
                    min={new Date()
                      .toISOString()
                      .split("T")[0]}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </Card>

            {/* Time */}
            <Card>
              <h2 className="text-lg font-bold text-slate-900">
                3. Choose time
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Pick an available time slot.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <Clock3 className="h-4 w-4" />
                      {time}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Address */}
            <Card>
              <h2 className="text-lg font-bold text-slate-900">
                4. Service address
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Where should the professional provide the service?
              </p>

              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full address
                </label>

                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <textarea
                    id="address"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    rows={4}
                    placeholder="House/Flat number, street, locality, city..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 pl-12 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card>
              <h2 className="text-lg font-bold text-slate-900">
                5. Additional notes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Optional information for the professional.
              </p>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                rows={4}
                placeholder="Describe the issue or add any instructions..."
                className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </Card>
          </div>

          {/* =========================
              SUMMARY
          ========================== */}
          <aside>
            <div className="sticky top-6 space-y-5">
              <Card>
                <h2 className="text-lg font-bold text-slate-900">
                  Booking summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Professional
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {provider.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Service
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedService}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedDate || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {selectedTime || "Not selected"}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Service price
                      </span>

                      <span className="font-semibold text-slate-900">
                        ₹{selectedServiceData.price}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Platform fee
                      </span>

                      <span className="font-semibold text-slate-900">
                        ₹0
                      </span>
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">
                          Estimated total
                        </span>

                        <span className="text-xl font-bold text-slate-900">
                          ₹{selectedServiceData.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  fullWidth
                  disabled={!canConfirm}
                  onClick={handleConfirmBooking}
                  className="mt-6"
                >
                  Confirm Booking
                </Button>

                {!canConfirm && (
                  <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                    Select a service, date, time and enter your address
                    to continue.
                  </p>
                )}
              </Card>

              {/* Trust */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Secure booking
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Your booking details are securely handled by
                      LocalPro. Payments will be added when backend
                      integration is implemented.
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

export default BookingPage;