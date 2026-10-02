import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Local<span className="text-blue-600">Pro</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Find Professionals
            </Link>

            <Link
              to="/provider/dashboard"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              For Professionals
            </Link>

            <NotificationBell />

            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <NotificationBell />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Find Professionals
              </Link>

              <Link
                to="/provider/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                For Professionals
              </Link>

              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
              >
                <UserRound className="h-4 w-4" />
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;