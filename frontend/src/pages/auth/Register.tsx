import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Mail,
  User,
  LockKeyhole,
  Wrench,
} from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* LEFT */}
        <div className="hidden w-1/2 bg-blue-600 p-12 lg:flex lg:flex-col lg:justify-between">

          <Link to="/" className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>

            <span className="text-2xl font-bold text-white">
              LocalPro
            </span>

          </Link>

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
              Join LocalPro
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-white">
              Find help.
              <br />
              Grow your business.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">
              Whether you're looking for reliable local services or want to
              grow your professional business, LocalPro brings both sides
              together.
            </p>

          </div>

          <p className="text-sm text-blue-200">
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

                <h2 className="text-3xl font-bold">
                  Create your account
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Join LocalPro in just a few steps.
                </p>

              </div>

              <form className="space-y-5">

                {/* NAME */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <div className="relative mt-2">

                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <div className="relative mt-2">

                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                {/* PASSWORD */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative mt-2">

                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-slate-200 py-3.5 pl-12 pr-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                {/* ACCOUNT TYPE */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    I want to
                  </label>

                  <div className="mt-2 grid grid-cols-2 gap-3">

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        name="role"
                        value="customer"
                        defaultChecked
                        className="peer sr-only"
                      />

                      <div className="rounded-xl border border-slate-200 p-4 transition peer-checked:border-blue-600 peer-checked:bg-blue-50">

                        <User className="h-5 w-5 text-blue-600" />

                        <p className="mt-2 text-sm font-bold">
                          Find services
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          I'm a customer
                        </p>

                      </div>

                    </label>

                    <label className="cursor-pointer">

                      <input
                        type="radio"
                        name="role"
                        value="provider"
                        className="peer sr-only"
                      />

                      <div className="rounded-xl border border-slate-200 p-4 transition peer-checked:border-blue-600 peer-checked:bg-blue-50">

                        <BriefcaseBusiness className="h-5 w-5 text-blue-600" />

                        <p className="mt-2 text-sm font-bold">
                          Offer services
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          I'm a professional
                        </p>

                      </div>

                    </label>

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  Create account
                </button>

              </form>

              <p className="mt-7 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Log in
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;