import { Link } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/data/products';
import { mockBrands } from '@/data/brands';
const HomePage = () => {
  return (
    <div>
      {/* Promotional Hero */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300">
              New collection
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Technology designed for everyday life.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-400">
              Discover smartphones, laptops, audio, wearables and accessories selected for modern
              living.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                Shop now
              </Link>

              <Link
                to="/about"
                className="rounded-lg border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:bg-neutral-900"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="flex h-96 w-96 items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-900">
              <span className="text-7xl font-bold tracking-tight text-neutral-700">NOVA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Curated for you
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
              Featured Products
            </h2>

            <p className="mt-3 max-w-xl text-neutral-600">
              Discover some of our most popular products, selected for quality, performance, and
              everyday use.
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 sm:block"
          >
            View all products
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockProducts
            .filter((product) => product.featured && product.status === 'active')
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <Link
          to="/shop"
          className="mt-8 block rounded-lg border border-neutral-300 px-4 py-3 text-center text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 sm:hidden"
        >
          View all products
        </Link>
      </section>

      {/* Brand Index placeholder */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
              Shop by Brand
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              Explore products from the brands available across our store.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {mockBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/shop?brand=${encodeURIComponent(brand.id)}`}
                className="flex min-h-24 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-center font-semibold text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
