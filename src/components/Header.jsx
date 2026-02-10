import { Moon, Sun, Heart } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto">
      <div
        className={`bg-[#abd1c6] rounded-full backdrop-saturate-100 transition-all duration-300 shadow-xl ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              {/* Logo Image */}

              <div className="flex items-baseline gap-2 relative">
                <h1
                  className={`text-2xl font-bold tracking-tight transition-colors duration-300 font-['Doto'] ${
                    darkMode ? "text-[#020826]" : "text-gray-900"
                  }`}
                >
                  Cuti Kuy
                </h1>
                <span
                  className={`bg-[#f25042] absolute left-24 rotate-[20deg] bottom-5 font-['Doto'] px-3 py-1 rounded-full text-sm font-bold transition-colors duration-300 ${
                    darkMode ? "text-[#eaddcf]" : "text-[#eaddcf]"
                  }`}
                >
                  2026
                </span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Trakteer Link */}
              <a
                href="https://trakteer.id/alfan_fauzy/tip"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-[#004643] text-[#fffffe] hover:bg-[#588b7c]"
                    : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Support Me</span>
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? "bg-[#f9bc60] text-white hover:bg-[#cd9b50]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
