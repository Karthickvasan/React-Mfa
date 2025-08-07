// src/pages/Verify2FA.jsx

import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const Verify2FA = () => {
  const [totp, setTotp] = useState(""); // Make sure it's initialized as a string
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/2fa/verify", { token: totp });

      if (res.data?.success) {
        alert("2FA Verified!");
        navigate("/"); // Redirect to home or dashboard
      } else {
        setError("Invalid TOTP code.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("/2fa/reset");
      alert("2FA reset. You will be logged out.");
      navigate("/login");
    } catch (err) {
      setError("Reset failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Validate TOTP</h2>
        <p className="mb-4 text-center">
          Please enter 6-digit Time based OTP to verify 2FA authentication
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handleVerify}>
          <label className="block mb-2 font-semibold">TOTP</label>
          <input
            type="text"
            name="totp"
            placeholder="Enter Your TOTP"
            value={totp} // ✅ always controlled
            onChange={(e) => setTotp(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded shadow"
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-2"
          >
            Verify TOTP
          </button>

          <button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            onClick={handleReset}
          >
            Reset 2FA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify2FA;
