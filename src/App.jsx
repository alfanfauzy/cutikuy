import { useState, useEffect, useRef } from "react";
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

  // Calendar fullscreen mode (hides header/footer)
  const [calendarOnlyMode, setCalendarOnlyMode] = useState(false);
  const calendarContainerRef = useRef(null);

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

  // Handle calendar fullscreen toggle
  const toggleCalendarFullscreen = async () => {
    if (!calendarOnlyMode) {
      // Enter fullscreen - hide header/footer
      setCalendarOnlyMode(true);
      try {
        if (calendarContainerRef.current) {
          await calendarContainerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen API not supported, using fallback");
      }
    } else {
      // Exit fullscreen - show header/footer
      setCalendarOnlyMode(false);
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen API error");
      }
    }
  };

  // Listen for fullscreen change events (user presses ESC)
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
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-[#eaddcf]" : "bg-[#f9f4ef]"
      }`}
    >
      {/* Header - Hidden in calendar only mode */}
      {!calendarOnlyMode && (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <main className="transition-colors duration-300">
        {/* Calendar Section - Fullscreen capable */}
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

      {/* Footer - Hidden in calendar only mode */}
      {!calendarOnlyMode && <Footer darkMode={darkMode} />}
    </div>
  );
}

export default App;
