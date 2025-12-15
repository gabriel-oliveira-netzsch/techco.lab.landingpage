import Link from 'next/link';

/**
 * Página 404 global (fallback para quando não há locale)
 * Esta página é exibida quando o usuário acessa uma rota inexistente
 * sem um locale válido (ex: /xyz em vez de /en/xyz)
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen bg-[#4c4d58]">
          <main className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.05)' }}
              />
              <div 
                className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(0, 184, 148, 0.1)' }}
              />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-16 py-20 md:py-32 relative z-10">
              <div className="flex flex-col items-center text-center gap-8">
                {/* 404 Number */}
                <div className="relative">
                  <span 
                    className="text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none select-none"
                    style={{ color: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    404
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-none"
                      style={{ color: '#00B894' }}
                    >
                      404
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white leading-tight">
                  Page not found
                </h1>

                {/* Description */}
                <p 
                  className="text-[16px] md:text-[18px] max-w-[500px] leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  The page you're looking for doesn't exist or has been moved.
                  Let's get you back on track.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  <Link 
                    href="/"
                    className="inline-flex gap-2 items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-[16px] text-white transition-colors"
                    style={{ backgroundColor: '#00B894' }}
                  >
                    Back to Home
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M6 12L10 8L6 4" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <Link 
                    href="/open-positions"
                    className="inline-flex gap-2 items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-[16px] text-white border-2 transition-colors"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                  >
                    View Open Positions
                  </Link>
                </div>

                {/* Language selector */}
                <div 
                  className="flex gap-4 mt-8 text-[14px]"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  <Link href="/" className="hover:text-white transition-colors">
                    🇺🇸 English
                  </Link>
                  <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
                  <Link href="/pt-BR" className="hover:text-white transition-colors">
                    🇧🇷 Português
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Simple footer */}
          <footer 
            className="py-6 text-center text-[14px]"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            © 2025 Techco.lab. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}

