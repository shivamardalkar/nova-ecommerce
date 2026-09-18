import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { mockBrands } from '@/data/brands';
import { mockProducts } from '@/data/products';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { selectIsAuthenticated } from '@/store/selectors/authSelectors';
import { selectIsProductInWishlist } from '@/store/selectors/wishlistSelectors';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const product = useMemo(() => mockProducts.find((item) => item.id === id), [id]);

  const isInWishlist = useAppSelector((state) =>
    product ? selectIsProductInWishlist(state, product.id) : false,
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-900">Product not found</h1>

        <p className="mt-3 text-neutral-600">
          The product you're looking for doesn't exist or is no longer available.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const brand = mockBrands.find((item) => item.id === product.brandId);
  const selectedImage = product.images[selectedImageIndex] ?? product.images[0];

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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500">
          <Link to="/" className="hover:text-neutral-900">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link to="/shop" className="hover:text-neutral-900">
            Shop
          </Link>

          <span className="mx-2">/</span>

          <span className="text-neutral-900">{product.name}</span>
        </nav>

        {/* Product */}
        <section className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
              <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 ${
                      selectedImageIndex === index ? 'border-neutral-900' : 'border-neutral-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              {brand?.name ?? 'Unknown brand'}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-neutral-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>

                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <span className="font-semibold text-neutral-900">★ {product.rating.toFixed(1)}</span>

              <span className="text-sm text-neutral-500">({product.reviews.length} reviews)</span>
            </div>

            <div className="my-6 border-t border-neutral-200" />

            <p className="leading-7 text-neutral-600">{product.description}</p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm font-semibold text-green-700">
                  {product.stock} units available
                </p>
              ) : (
                <p className="text-sm font-semibold text-red-600">Out of stock</p>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-6">
                <label className="text-sm font-medium text-neutral-800">Quantity</label>

                <div className="mt-2 flex w-fit items-center rounded-lg border border-neutral-300">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="px-4 py-2 text-lg hover:bg-neutral-100"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center text-sm font-semibold">{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-lg hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-900 transition hover:border-neutral-900"
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-16 border-t border-neutral-200 pt-12">
          <h2 className="text-2xl font-bold text-neutral-900">Specifications</h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
            {product.specifications.map((specification, index) => (
              <div
                key={`${specification.key}-${index}`}
                className="grid grid-cols-1 border-b border-neutral-200 last:border-b-0 sm:grid-cols-3"
              >
                <div className="bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-800">
                  {specification.key}
                </div>

                <div className="px-5 py-4 text-sm text-neutral-600 sm:col-span-2">
                  {specification.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16 border-t border-neutral-200 pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Customer Reviews</h2>

              <p className="mt-2 text-sm text-neutral-500">
                {product.reviews.length} reviews · Average rating {product.rating.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <article key={review.id} className="rounded-xl border border-neutral-200 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-neutral-900">{review.userName}</h3>

                    <span className="text-sm font-semibold text-neutral-700">
                      ★ {review.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">{review.comment}</p>
                </article>
              ))
            ) : (
              <p className="text-sm text-neutral-500">No reviews available for this product.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
