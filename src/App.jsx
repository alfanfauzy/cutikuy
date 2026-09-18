import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import Footer from "./components/Footer";
import { holidays } from "./data/holidays";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return true;
    }
    return true;
  });

  const [calendarOnlyMode, setCalendarOnlyMode] = useState(false);
  const calendarContainerRef = useRef(null);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

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
      className={`min-h-screen bg-background transition-colors duration-300 ease-in-out ${
        darkMode ? "dark" : ""
      }`}
    >
      {!calendarOnlyMode && (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <main>
        <section
          id="holidays"
          ref={calendarContainerRef}
          className={`bg-background ${
            calendarOnlyMode ? "h-screen overflow-auto py-8" : "py-8"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CalendarView
              holidays={holidays}
              calendarOnlyMode={calendarOnlyMode}
              toggleCalendarFullscreen={toggleCalendarFullscreen}
            />
          </div>
        </section>
      </main>

      {!calendarOnlyMode && <Footer />}
    </div>
  );
}

export default App;
