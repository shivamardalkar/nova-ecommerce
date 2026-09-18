import { Link, useNavigate } from 'react-router-dom';

import ProductCard from '@/components/product/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromWishlist, clearWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { selectWishlistItems } from '@/store/selectors/wishlistSelectors';

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleMoveToCart = (productId: string) => {
    const wishlistItem = wishlistItems.find((item) => item.product.id === productId);

    if (!wishlistItem) {
      return;
    }

    if (wishlistItem.product.stock <= 0) {
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
      <main className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            ♡
          </div>

          <h1 className="mt-6 text-3xl font-bold text-neutral-900">Your wishlist is empty</h1>

          <p className="mt-3 text-neutral-600">
            Save products you love and come back to them later.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Home / Wishlist</p>

            <h1 className="mt-2 text-3xl font-bold text-neutral-900">My Wishlist</h1>

            <p className="mt-2 text-neutral-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'product' : 'products'} saved
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearWishlist())}
            className="w-fit rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            const product = item.product;
            const isOutOfStock = product.stock <= 0;

            return (
              <div key={product.id} className="relative overflow-hidden rounded-xl">
                <ProductCard product={product} />

                <div className="border-x border-b border-neutral-200 bg-white p-4">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product.id)}
                    disabled={isOutOfStock}
                    className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                  >
                    {isOutOfStock ? 'Out of Stock' : 'Move to Cart'}
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
