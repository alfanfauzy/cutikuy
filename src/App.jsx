import { useState, useEffect } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import Footer from "./components/Footer";
import { holidays, categories, states } from "./data/holidays";
import "./App.css";

function App() {
  // Dark mode state - check system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    }
    return true;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="transition-colors duration-300">
        {/* Calendar Section */}
        <section id="holidays" className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CalendarView
              holidays={holidays}
              categories={categories}
              states={states}
              darkMode={darkMode}
            />
          </div>
        </section>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
