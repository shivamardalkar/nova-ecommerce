import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-14">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="NOVA home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black tracking-tight text-neutral-950 transition-transform group-hover:scale-105">
                N
              </span>

              <span className="text-xl font-bold tracking-[-0.03em]">NOVA</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
              Modern products, simple shopping, and a seamless customer experience.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1.5 text-xs text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Built for a better shopping experience</span>
            </div>
          </div>

          {/* Store */}
          <div>
            <h2 className="text-sm font-semibold text-white">Store</h2>

            <nav className="mt-4 flex flex-col items-start gap-3 text-sm">
              <Link to="/shop" className="text-neutral-400 transition-colors hover:text-white">
                Shop
              </Link>

              <Link to="/about" className="text-neutral-400 transition-colors hover:text-white">
                About
              </Link>

              <Link to="/faq" className="text-neutral-400 transition-colors hover:text-white">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-sm font-semibold text-white">Help</h2>

            <nav className="mt-4 flex flex-col items-start gap-3 text-sm">
              <Link to="/support" className="text-neutral-400 transition-colors hover:text-white">
                Support
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-neutral-800 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} NOVA Store. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Secure shopping</span>
            <span className="h-1 w-1 rounded-full bg-neutral-700" />
            <span>Frontend demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
