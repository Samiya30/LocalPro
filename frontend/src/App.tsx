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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/services/:slug" element={<ServiceResults />} />

        <Route
          path="/providers/:providerId"
          element={<ProviderProfile />}
        />

        <Route
          path="/providers/:providerId/booking"
          element={<BookingPage />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/provider/dashboard"
          element={<ProviderDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/providers/:providerId/quote"
          element={<QuoteRequest />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;