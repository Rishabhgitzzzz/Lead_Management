import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ← context
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuth(); // ← from context
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) return;
    try {
      await login(email, password);
      navigate("/");
    } catch {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Let's get back to work
        </h1>

        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="••••••••"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            No account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
