import { Link } from 'react-router-dom';

import ProductCard from '@/components/product/ProductCard';

import { mockBrands } from '@/data/brands';
import { mockProducts } from '@/data/products';

const HomePage = () => {
  const featuredProducts = mockProducts
    .filter((product) => product.featured && product.status === 'active')
    .slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="overflow-hidden bg-neutral-950 text-white">
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              New collection
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Technology designed for everyday life.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              Discover smartphones, laptops, audio, wearables and accessories selected for modern
              living.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                Shop now
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center rounded-lg border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-neutral-800 pt-6 text-sm text-neutral-400">
              <span>30+ products</span>
              <span>8 leading brands</span>
              <span>Secure checkout</span>
            </div>
          </div>

          <div className="relative hidden lg:flex lg:justify-end">
            <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-[2rem] border border-neutral-800 bg-neutral-900">
              <div className="absolute inset-8 rounded-[1.5rem] border border-neutral-800" />
              <div className="relative h-32 w-40">
                <p className="absolute left-1/2 top-0 -translate-x-1/2 text-8xl font-black leading-none tracking-tighter text-neutral-800">
                  N
                </p>

                <p className="absolute left-1/2 top-[104px] -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                  NOVA
                </p>
              </div>

              <div className="absolute right-8 top-8 h-3 w-3 rounded-full bg-white" />
              <div className="absolute bottom-10 left-10 h-2 w-2 rounded-full bg-neutral-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Curated for you
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
              Discover popular products selected for quality, performance, and everyday use.
            </p>
          </div>

          <Link
            to="/shop"
            className="hidden shrink-0 items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900 sm:inline-flex"
          >
            View all products
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-neutral-300 px-6 py-12 text-center">
            <p className="font-semibold text-neutral-900">No featured products available.</p>
            <p className="mt-2 text-sm text-neutral-500">Check back soon for new products.</p>
          </div>
        )}

        <Link
          to="/shop"
          className="mt-8 flex items-center justify-center rounded-lg border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50 sm:hidden"
        >
          View all products
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </section>

      {/* Shop by Brand */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Shop by Brand
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
              Explore products from the brands available across our store.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {mockBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/shop?brand=${encodeURIComponent(brand.id)}`}
                className="group flex min-h-24 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-center transition hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              >
                <span className="text-sm font-semibold text-neutral-700 transition group-hover:text-neutral-950">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Store Promise */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-950">Curated selection</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Carefully selected technology products across multiple categories.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-950">Simple shopping</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Search, filter, compare and save products with an easy storefront experience.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-950">Built for NOVA</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              A responsive shopping experience designed for modern devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
