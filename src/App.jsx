import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import Footer from "./components/Footer";
import { holidays, categories, states } from "./data/holidays";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    }
    return true;
  });

  const [calendarOnlyMode, setCalendarOnlyMode] = useState(false);
  const calendarContainerRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
      className={`min-h-screen transition-colors duration-300 bg-background ${
        darkMode ? "dark" : ""
      }`}
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
