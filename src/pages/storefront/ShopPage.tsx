import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import ProductCard from '@/components/product/ProductCard';

import { mockBrands } from '@/data/brands';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProducts } from '@/store/selectors/productSelectors';
import { fetchProducts } from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { selectCategories } from '@/store/selectors/categorySelectors';

type SortOption = 'default' | 'price-asc' | 'price-desc';

const ShopPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') ?? '');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const priceLimit = maxPrice ? Number(maxPrice) : Infinity;

    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;

      const matchesBrand = !selectedBrand || product.brandId === selectedBrand;

      const matchesPrice = product.price <= priceLimit;

      return (
        product.status === 'active' &&
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice
      );
    });

    if (sortOption === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOption === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, maxPrice, sortOption]);

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedCategory) ||
    Boolean(selectedBrand) ||
    Boolean(maxPrice) ||
    sortOption !== 'default';

  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory,
  )?.name;

  const selectedBrandName = mockBrands.find((brand) => brand.id === selectedBrand)?.name;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setMaxPrice('');
    setSortOption('default');
  };

  return (
    <div className="bg-neutral-50">
      {/* Page Header */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            NOVA Store
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-950">Shop</h1>

          <p className="mt-3 max-w-2xl leading-6 text-neutral-600">
            Explore our collection of technology products and find the right products for your
            everyday needs.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="relative">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products by name or description..."
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-950"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-neutral-950">Filters</h2>

                {hasActiveFilters && (
                  <p className="mt-1 text-xs text-neutral-500">Filters applied</p>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-neutral-600 underline underline-offset-4 transition hover:text-neutral-950"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category */}
            <div className="mt-6">
              <label
                htmlFor="category-filter"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Category
              </label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
              >
                <option value="">All categories</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="mt-5">
              <label
                htmlFor="brand-filter"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Brand
              </label>

              <select
                id="brand-filter"
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
              >
                <option value="">All brands</option>

                {mockBrands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mt-5">
              <label
                htmlFor="price-filter"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Maximum price
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                  ₹
                </span>

                <input
                  id="price-filter"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="50000"
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-8 pr-3 text-sm outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Products */}
          <section>
            {/* Results header */}
            <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-600">
                    Showing{' '}
                    <span className="font-semibold text-neutral-950">
                      {filteredProducts.length}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-neutral-950">
                      {products.filter((product) => product.status === 'active').length}
                    </span>{' '}
                    products
                  </p>

                  {hasActiveFilters && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {searchTerm.trim() && (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                          Search: "{searchTerm.trim()}"
                        </span>
                      )}

                      {selectedCategoryName && (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                          {selectedCategoryName}
                        </span>
                      )}

                      {selectedBrandName && (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                          {selectedBrandName}
                        </span>
                      )}

                      {maxPrice && (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                          Up to ₹{Number(maxPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-products"
                    className="whitespace-nowrap text-sm font-medium text-neutral-700"
                  >
                    Sort by
                  </label>

                  <select
                    id="sort-products"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value as SortOption)}
                    className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                  >
                    <option value="default">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-neutral-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </div>

                <h2 className="mt-5 text-xl font-semibold text-neutral-950">No products found</h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                  Try changing your search or adjusting your filters to find what you're looking
                  for.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
