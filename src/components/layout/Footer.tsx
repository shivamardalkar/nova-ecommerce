import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              NOVA
            </Link>

            <p className="mt-2 max-w-sm text-sm text-neutral-400">
              Modern products, simple shopping, and a seamless customer
              experience.
            </p>
          </div>

          <nav className="flex flex-wrap gap-5 text-sm text-neutral-400">
            <Link
              to="/shop"
              className="transition hover:text-white"
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/faq"
              className="transition hover:text-white"
            >
              FAQ
            </Link>

            <Link
              to="/support"
              className="transition hover:text-white"
            >
              Support
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} NOVA Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;