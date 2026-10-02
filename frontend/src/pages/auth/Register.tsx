import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Mail,
  User,
  LockKeyhole,
  Wrench,
} from "lucide-react";
import { FormEvent, useState } from "react";

import api from "../../services/api";
import {
  saveAuthData,
  type AuthUser,
} from "../../services/authService";

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">(
    "CUSTOMER"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<RegisterResponse>(
        "/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }
      );

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Unable to create your account."
        );
        return;
      }

      const { token, user } = response.data.data;

      saveAuthData(token, user);

      if (user.role === "PROVIDER") {
        navigate("/provider/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

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
              Whether you're looking for reliable local services or
              want to grow your professional business, LocalPro
              brings both sides together.
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

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                {/* NAME */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <div className="relative mt-2">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Your full name"
                      autoComplete="name"
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
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
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
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Create a password"
                      autoComplete="new-password"
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
                        value="CUSTOMER"
                        checked={role === "CUSTOMER"}
                        onChange={() =>
                          setRole("CUSTOMER")
                        }
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
                        value="PROVIDER"
                        checked={role === "PROVIDER"}
                        onChange={() =>
                          setRole("PROVIDER")
                        }
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
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating account..."
                    : "Create account"}
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