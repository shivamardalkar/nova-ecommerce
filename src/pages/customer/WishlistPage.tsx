import { Link, useNavigate } from 'react-router-dom';

import ProductCard from '@/components/product/ProductCard';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectWishlistItems } from '@/store/selectors/wishlistSelectors';

import { addToCart } from '@/store/slices/cartSlice';

import { clearWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleMoveToCart = (productId: string) => {
    const wishlistItem = wishlistItems.find((item) => item.product.id === productId);

    if (!wishlistItem || wishlistItem.product.stock <= 0) {
      return;
    }

    dispatch(
      addToCart({
        product: wishlistItem.product,
        quantity: 1,
      }),
    );

    dispatch(removeFromWishlist(productId));

    navigate('/cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200">
            <svg
              aria-hidden="true"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
              />
            </svg>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Wishlist
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            Your wishlist is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            Save products you love and come back to them whenever you're ready to shop.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Explore Products
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-7">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link to="/" className="text-neutral-500 transition hover:text-neutral-900">
              Home
            </Link>

            <span className="text-neutral-300">/</span>

            <span className="font-medium text-neutral-900">Wishlist</span>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900">My Wishlist</h1>

              <p className="mt-2 text-sm text-neutral-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'product' : 'products'} saved
                for later.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(clearWishlist())}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"
                />
              </svg>
              Clear Wishlist
            </button>
          </div>
        </header>

        {/* Wishlist info */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
              />
            </svg>
          </div>

          <p className="text-sm text-neutral-600">
            Products saved here are available for you to review anytime.
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            const product = item.product;
            const isOutOfStock = product.stock <= 0;
            const isLowStock = product.stock > 0 && product.stock <= 5;

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative">
                  <ProductCard product={product} />

                  {/* Wishlist indicator */}
                  <div className="pointer-events-none absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm ring-1 ring-black/5">
                    <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
                    </svg>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-neutral-200 p-4">
                  {isOutOfStock ? (
                    <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-700">
                      Currently out of stock
                    </div>
                  ) : isLowStock ? (
                    <div className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-center text-xs font-semibold text-amber-700">
                      Only {product.stock} left in stock
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product.id)}
                    disabled={isOutOfStock}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4h2l1.5 12h11L19 7H6.2"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h.01M17 20h.01" />
                    </svg>

                    {isOutOfStock ? 'Out of Stock' : 'Move to Cart'}
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
                    </svg>
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-neutral-900">Want to discover something new?</p>

          <p className="mt-1 text-sm text-neutral-500">
            Browse our latest products and add more to your wishlist.
          </p>

          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Explore Products
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
