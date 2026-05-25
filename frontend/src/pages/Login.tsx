import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B1A] flex items-center justify-center px-4 overflow-hidden relative">
      
      <div className="relative z-10 w-full max-w-md bg-[#11182D] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
      
        <div className="text-center mb-8">
          

          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
            Log Manager
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome back!
          </p>
        </div>

      
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl mb-5">
            {error}
          </div>
        )}

        
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-300 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
              className="w-full bg-[#0B1023] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

        
          <div className="mb-7">
            <label className="block text-gray-300 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              required
              className="w-full bg-[#0B1023] border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

        
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 py-3 rounded-2xl text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

      
        <p className="text-center mt-7 text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400 hover:text-violet-300 font-semibold transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}