const AboutPage = () => {
    return (
        <main>
            <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
                            About NOVA
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Shopping made simple.
                        </h1>

                        <p className="mt-6 text-base leading-7 text-neutral-300 sm:text-lg">
                            NOVA is a modern e-commerce platform designed to
                            make discovering quality products, comparing
                            options, and completing purchases simple and
                            convenient.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                            Our Story
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">
                            Built around a better shopping experience.
                        </h2>

                        <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
                            <p>
                                NOVA brings products from different categories
                                and brands together in one easy-to-use
                                shopping experience.
                            </p>

                            <p>
                                From browsing and filtering products to
                                managing your wishlist, cart, and orders, every
                                part of the experience is designed to be clear,
                                responsive, and easy to use.
                            </p>

                            <p>
                                Our goal is simple: help customers find the
                                products they need without unnecessary
                                complexity.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-neutral-100 p-8 sm:p-10">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-3xl font-bold text-neutral-900">
                                    30+
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                    Products
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-neutral-900">
                                    8+
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                    Brands
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-neutral-900">
                                    6+
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                    Categories
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-neutral-900">
                                    24/7
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                    Online access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                            Why NOVA
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">
                            Everything you need in one place.
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <article className="rounded-xl border border-neutral-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Easy Discovery
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                Search, filter, sort, and browse products by
                                category and brand.
                            </p>
                        </article>

                        <article className="rounded-xl border border-neutral-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Simple Shopping
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                Keep products in your wishlist or cart and
                                manage quantities before checkout.
                            </p>
                        </article>

                        <article className="rounded-xl border border-neutral-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Order Management
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                Keep track of your purchases and review order
                                details from your account.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;