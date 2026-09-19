import { useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@/data/brands';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsProductInWishlist } from '@/store/selectors/wishlistSelectors';
import {
  addToWishlist,
  removeFromWishlist,
} from '@/store/slices/wishlistSlice';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const [imageError, setImageError] = useState(false);

  const brand = mockBrands.find(
    (item) => item.id === product.brandId,
  );

  const isInWishlist = useAppSelector((state) =>
    selectIsProductInWishlist(state, product.id),
  );

  const hasDiscount =
    product.originalPrice > product.price &&
    product.discountPercentage > 0;

  const handleWishlistToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      return;
    }

    dispatch(addToWishlist(product));
  };

  const imageSource = imageError
    ? 'https://placehold.co/600x600?text=NOVA'
    : product.images[0] ||
      'https://placehold.co/600x600?text=NOVA';

  return (
    <article className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img
            src={imageSource}
            alt={product.name}
            className={`h-full w-full object-cover transition duration-500 ${
              product.stock > 0
                ? 'group-hover:scale-105'
                : 'opacity-60 grayscale'
            }`}
            loading="lazy"
            onError={() => setImageError(true)}
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.featured && (
              <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-semibold text-white">
                Featured
              </span>
            )}

            {hasDiscount && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={
              isInWishlist
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isInWishlist}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 shadow-sm backdrop-blur transition ${
              isInWishlist
                ? 'border-red-200 text-red-600'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isInWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              />
            </svg>
          </button>

          {product.stock === 0 && (
            <div className="absolute inset-x-0 bottom-0 bg-neutral-950/80 px-3 py-2 text-center text-xs font-semibold text-white">
              Out of stock
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {brand?.name ?? 'Unknown brand'}
          </p>

          <h3 className="mt-1 min-h-12 line-clamp-2 text-base font-semibold text-neutral-900">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900">
              ★ {product.rating.toFixed(1)}
            </span>

            <span className="text-xs text-neutral-400">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-end gap-2">
            <span className="text-lg font-bold text-neutral-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {hasDiscount && (
              <span className="text-sm text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="mt-3">
            {product.stock > 0 ? (
              <span className="text-xs font-medium text-green-600">
                In stock
              </span>
            ) : (
              <span className="text-xs font-medium text-red-600">
                Currently unavailable
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;