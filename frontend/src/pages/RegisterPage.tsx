import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function RegisterPage() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales");

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  async function handleRegister() {
    if (!username || !email || !password) return;
    try {
      await register(username, email, password, role);
      navigate("/login");
    } catch {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Create Account
        </h1>

        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            value={username}
            onChange={setName}
            placeholder="Your full name"
          />
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
            placeholder="Min 6 characters"
          />
          <Select
            label="Role"
            value={role}
            onChange={setRole}
            options={[
              { label: "Sales User", value: "sales" },
              { label: "Admin", value: "admin" },
            ]}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? "Creating account..." : "Register"}
          </Button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
