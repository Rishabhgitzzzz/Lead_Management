import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDark } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        Smart Leads
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {user?.name}{" "}
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
            {user?.role}
          </span>
        </span>
        <button
          onClick={toggleDark}
          title="Toggle dark mode"
          className="text-lg"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
