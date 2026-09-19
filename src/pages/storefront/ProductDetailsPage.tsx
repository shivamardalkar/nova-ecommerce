import { Link, useNavigate, useParams } from 'react-router-dom';

import { mockBrands } from '@/data/brands';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';
import { selectProducts } from '@/store/selectors/productSelectors';
import { selectIsAuthenticated } from '@/store/selectors/authSelectors';
import { selectIsProductInWishlist } from '@/store/selectors/wishlistSelectors';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = products.find((item) => item.id === id);

  const isInWishlist = useAppSelector((state) =>
    product ? selectIsProductInWishlist(state, product.id) : false,
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <span className="text-2xl">📦</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-neutral-950">Product not found</h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            The product you're looking for doesn't exist or is no longer available.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const brand = mockBrands.find((item) => item.id === product.brandId);

  const selectedImage = imageError
    ? 'https://placehold.co/800x800?text=NOVA'
    : (product.images[selectedImageIndex] ??
      product.images[0] ??
      'https://placehold.co/800x800?text=NOVA');

  const hasDiscount = product.originalPrice > product.price && product.discountPercentage > 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: {
            pathname: `/products/${product.id}`,
          },
        },
      });

      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
      }),
    );
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: {
            pathname: `/products/${product.id}`,
          },
        },
      });

      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(product.stock, current + 1));
  };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-neutral-500 transition hover:text-neutral-950">
            Home
          </Link>

          <span className="text-neutral-300">/</span>

          <Link to="/shop" className="text-neutral-500 transition hover:text-neutral-950">
            Shop
          </Link>

          <span className="text-neutral-300">/</span>

          <span className="max-w-[240px] truncate font-medium text-neutral-900">
            {product.name}
          </span>
        </nav>

        {/* Product */}
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />

              {hasDiscount && (
                <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setImageError(false);
                    }}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`aspect-square overflow-hidden rounded-xl border-2 bg-neutral-100 transition ${
                      selectedImageIndex === index
                        ? 'border-neutral-950'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              {brand?.name ?? 'Unknown brand'}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5">
                <span className="text-sm font-bold text-neutral-900">
                  ★ {product.rating.toFixed(1)}
                </span>
              </div>

              <span className="text-sm text-neutral-500">
                {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>

            <div className="my-6 border-t border-neutral-200" />

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-neutral-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                {hasDiscount && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>

                    <span className="text-sm font-semibold text-green-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 leading-7 text-neutral-600">{product.description}</p>

            {/* Stock */}
            <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              {product.stock > 0 ? (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">In stock</p>

                    <p className="mt-1 text-xs text-neutral-500">{product.stock} units available</p>
                  </div>

                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-red-600">Out of stock</p>

                  <p className="mt-1 text-xs text-neutral-500">
                    This product is currently unavailable.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="product-quantity"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Quantity
                </label>

                <div
                  id="product-quantity"
                  className="mt-2 flex w-fit items-center overflow-hidden rounded-lg border border-neutral-300"
                >
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center text-lg text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="flex h-10 min-w-12 items-center justify-center border-x border-neutral-300 px-3 text-sm font-semibold text-neutral-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-lg text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="rounded-lg bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={`rounded-lg border px-6 py-3.5 text-sm font-semibold transition ${
                  isInWishlist
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-neutral-300 text-neutral-900 hover:border-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {isInWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
              </button>
            </div>

            {!isAuthenticated && (
              <p className="mt-3 text-xs text-neutral-500">
                Sign in is required to add products to your cart or wishlist.
              </p>
            )}
          </div>
        </section>

        {/* Specifications */}
        {product.specifications.length > 0 && (
          <section className="mt-16 border-t border-neutral-200 pt-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Product Details
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950">Specifications</h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
              {product.specifications.map((specification, index) => (
                <div
                  key={`${specification.key}-${index}`}
                  className="grid grid-cols-1 border-b border-neutral-200 last:border-b-0 sm:grid-cols-3"
                >
                  <div className="bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800">
                    {specification.key}
                  </div>

                  <div className="px-5 py-4 text-sm leading-6 text-neutral-600 sm:col-span-2">
                    {specification.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-16 border-t border-neutral-200 pt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Customer Feedback
              </p>

              <h2 className="mt-2 text-2xl font-bold text-neutral-950">Customer Reviews</h2>
            </div>

            <p className="text-sm text-neutral-500">
              {product.reviews.length} reviews · Average {product.rating.toFixed(1)}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <article key={review.id} className="rounded-xl border border-neutral-200 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-neutral-950">{review.userName}</h3>

                    <span className="inline-flex w-fit rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                      ★ {review.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">{review.comment}</p>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-10 text-center">
                <p className="text-sm text-neutral-500">No reviews available for this product.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
