import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '@/components/product/ProductCard';
import { mockBrands } from '@/data/brands';
import { mockCategories } from '@/data/categories';
import { mockProducts } from '@/data/products';

type SortOption = 'default' | 'price-asc' | 'price-desc';

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') ?? '');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const priceLimit = maxPrice ? Number(maxPrice) : Infinity;

    const filtered = mockProducts.filter((product) => {
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
  }, [maxPrice, searchTerm, selectedBrand, selectedCategory, sortOption]);

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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            NOVA Store
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">Shop</h1>

          <p className="mt-3 max-w-2xl text-neutral-600">
            Explore our collection of technology products and find the right products for your
            everyday needs.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name or description..."
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900">Filters</h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
              >
                Clear all
              </button>
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
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
              >
                <option value="">All categories</option>

                {mockCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="mt-6">
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
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
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
            <div className="mt-6">
              <label
                htmlFor="price-filter"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Maximum price
              </label>

              <input
                id="price-filter"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="e.g. 50000"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </aside>

          {/* Products */}
          <section>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-neutral-600">
                Showing{' '}
                <span className="font-semibold text-neutral-900">{filteredProducts.length}</span>{' '}
                products
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort-products" className="text-sm font-medium text-neutral-700">
                  Sort by
                </label>

                <select
                  id="sort-products"
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as SortOption)}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
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
                <h2 className="text-xl font-semibold text-neutral-900">No products found</h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
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
