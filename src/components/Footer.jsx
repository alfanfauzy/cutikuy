import { Heart } from "lucide-react";

export default function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom */}
        <div className="py-2 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-white ">
            Cuti Kuy -{" "}
            <a
              href={import.meta.env.VITE_URL_SKB_MENTERI}
              target="_blank"
              className="hover:text-blue-400 italic"
            >
              Based on SKB Menteri
            </a>{" "}
            © {currentYear}.
          </p>
        </div>
      </div>
    </footer>
  );
}
