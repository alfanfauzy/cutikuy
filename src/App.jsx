import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import Footer from "./components/Footer";
import { holidays, categories, states } from "./data/holidays";
import "./App.css";

function App() {
  // Initialize theme from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      // Default to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [calendarOnlyMode, setCalendarOnlyMode] = useState(false);
  const calendarContainerRef = useRef(null);

  // Smooth theme toggle with transition state
  const toggleDarkMode = useCallback(() => {
    setIsTransitioning(true);
    setDarkMode((prev) => !prev);
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  // Apply theme class and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set preference
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleCalendarFullscreen = async () => {
    if (!calendarOnlyMode) {
      setCalendarOnlyMode(true);
      try {
        if (calendarContainerRef.current) {
          await calendarContainerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen API not supported, using fallback", err);
      }
    } else {
      setCalendarOnlyMode(false);
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen error", err);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setCalendarOnlyMode(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-500 ease-in-out ${
        darkMode ? "dark" : ""
      } ${isTransitioning ? "theme-transitioning" : ""}`}
    >
      {!calendarOnlyMode && (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <main className="transition-colors duration-300">
        <section
          id="holidays"
          ref={calendarContainerRef}
          className={`${calendarOnlyMode ? "h-screen overflow-auto p-4" : "py-8"}`}
        >
          <div
            className={`${
              calendarOnlyMode
                ? "h-full max-w-full"
                : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            }`}
          >
            <CalendarView
              holidays={holidays}
              categories={categories}
              states={states}
              darkMode={darkMode}
              calendarOnlyMode={calendarOnlyMode}
              toggleCalendarFullscreen={toggleCalendarFullscreen}
            />
          </div>
        </section>
      </main>

      {!calendarOnlyMode && <Footer darkMode={darkMode} />}
    </div>
  );
}

export default App;
