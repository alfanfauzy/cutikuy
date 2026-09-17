export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row items-center justify-center gap-1 text-sm text-muted-foreground">
          <p>Cuti Kuy © {currentYear}</p>
          <span className="hidden md:inline" aria-hidden="true">
            ·
          </span>
          <p>Kalender libur nasional &amp; cuti bersama Indonesia</p>
        </div>
      </div>
    </footer>
  );
}