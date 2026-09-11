import { Link } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail, Wrench } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* LEFT */}
        <div className="hidden w-1/2 bg-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Wrench className="h-5 w-5 text-white" />
            </div>

            <span className="text-2xl font-bold text-white">
              Local<span className="text-blue-400">Pro</span>
            </span>
          </Link>

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Welcome back
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-white">
              Your trusted local services marketplace.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Find professionals, manage your bookings and keep everything
              organized in one place.
            </p>

          </div>

          <p className="text-sm text-slate-500">
            © 2026 LocalPro
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">

              <div className="mb-8">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <LockKeyhole className="h-6 w-6 text-blue-600" />
                </div>

                <h2 className="text-3xl font-bold">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Log in to continue to LocalPro.
                </p>

              </div>

              <form className="space-y-5">

                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <div className="relative mt-2">

                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                <div>

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative mt-2">

                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Log in
                </button>

              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create one
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;