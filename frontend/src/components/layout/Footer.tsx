import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Local<span className="text-blue-600">Pro</span>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Find trusted local professionals, compare services, request
              quotes, and book reliable services in one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Customers
            </h3>

            <div className="mt-3 space-y-2">
              <Link
                to="/"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                Find Professionals
              </Link>

              <Link
                to="/customer/dashboard"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                My Bookings
              </Link>

              <Link
                to="/login"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Professionals
            </h3>

            <div className="mt-3 space-y-2">
              <Link
                to="/provider/dashboard"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                Provider Dashboard
              </Link>

              <Link
                to="/register"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                Join LocalPro
              </Link>

              <Link
                to="/admin/dashboard"
                className="block text-sm text-slate-500 hover:text-blue-600"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-400">
            © 2026 LocalPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;