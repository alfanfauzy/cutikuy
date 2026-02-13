export default function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`py-4 flex flex-col md:flex-row justify-center items-center font-['Doto'] text-sm font-medium ${darkMode ? "text-d-foreground" : "text-black"}`}
        >
          <p>CUTI KUY © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
