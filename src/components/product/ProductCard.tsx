import { Link } from 'react-router-dom';

import type { Product } from '@/types';
import { mockBrands } from '@/data/brands';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

  const brand = mockBrands.find((item) => item.id === product.brandId);

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {product.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {brand?.name ?? 'Unknown brand'}
          </p>

          <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-semibold text-neutral-900">
            {product.name}
          </h3>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-lg font-bold text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {product.stock > 0 ? (
              <span className="text-xs font-medium text-neutral-500">In stock</span>
            ) : (
              <span className="text-xs font-medium text-red-600">Out of stock</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
