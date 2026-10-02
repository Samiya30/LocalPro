import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ServiceResults from "./pages/ServiceResults";
import ProviderProfile from "./pages/ProviderProfile";
import BookingPage from "./pages/BookingPage";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuoteRequest from "./pages/QuoteRequest";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/services/:slug"
          element={<ServiceResults />}
        />

        <Route
          path="/providers/:providerId"
          element={<ProviderProfile />}
        />

        <Route
          path="/providers/:providerId/booking"
          element={<BookingPage />}
        />

        <Route
          path="/providers/:providerId/quote"
          element={<QuoteRequest />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}
        >
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />
        </Route>

        {/* Provider routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["PROVIDER"]} />}
        >
          <Route
            path="/provider/dashboard"
            element={<ProviderDashboard />}
          />
        </Route>

        {/* Admin routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;