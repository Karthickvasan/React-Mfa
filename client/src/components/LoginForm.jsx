import React, { useState } from "react";
import { register, login } from "../services/authApi"; // Make sure you have a login API in authApi.js

const LoginForm = ({ isRegister = false, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password); // <-- This must exist in your services
      setMessage("Login successful");
      setError("");
      if (onSubmit) onSubmit(data); // You can handle redirection or auth state here
    } catch (error) {
      console.error("Login error:", error);
      setMessage("");
      setError("Invalid username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await register(username, password);
      setMessage(data.message || "User registered successfully");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("Register error:", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white p-6 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "Create Account" : "Login"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Enter your password"
          required
        />
      </div>

      {isRegister && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Confirm password"
            required
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-3">{message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
      >
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
