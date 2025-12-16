import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-slate-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 supports-[backdrop-filter]:bg-white/50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Moto Club Automotive"
                width={48}
                height={48}
                className="rounded-xl w-10 h-10 sm:w-12 sm:h-12 shadow-sm"
              />
              <h1 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight"></h1>
            </div>
            <Link
              href="https://www.opencoders.icu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-slate-500 hover:text-blue-600 transition-colors -mt-1 font-medium"
            >
              powered by opencoders
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
