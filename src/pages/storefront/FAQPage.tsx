import { useMemo, useState } from 'react';

import { mockFAQs } from '@/data';

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const filteredFAQs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return mockFAQs;
        }

        return mockFAQs.filter((faq) => {
            return (
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                faq.category.toLowerCase().includes(query)
            );
        });
    }, [searchQuery]);

    return (
        <main>
            <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                        Help Center
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        Frequently Asked Questions
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-300">
                        Find quick answers to common questions about shopping,
                        orders, payments, and your NOVA account.
                    </p>

                    <div className="mx-auto mt-8 max-w-2xl">
                        <label htmlFor="faq-search" className="sr-only">
                            Search FAQs
                        </label>

                        <input
                            id="faq-search"
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search questions..."
                            className="w-full rounded-xl border border-neutral-700 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-white"
                        />
                    </div>
                </div>
            </section>

            <section className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {filteredFAQs.length === 0 ? (
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center">
                            <h2 className="text-lg font-semibold text-neutral-900">
                                No FAQs found
                            </h2>

                            <p className="mt-2 text-sm text-neutral-500">
                                Try searching with a different keyword.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFAQs.map((faq) => {
                                const isOpen = openFaqId === faq.id;

                                return (
                                    <article
                                        key={faq.id}
                                        className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenFaqId(
                                                    isOpen ? null : faq.id,
                                                )
                                            }
                                            className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left transition hover:bg-neutral-50"
                                            aria-expanded={isOpen}
                                        >
                                            <div>
                                                <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-400">
                                                    {faq.category}
                                                </span>

                                                <span className="text-sm font-semibold text-neutral-900 sm:text-base">
                                                    {faq.question}
                                                </span>
                                            </div>

                                            <span
                                                className="shrink-0 text-xl text-neutral-500"
                                                aria-hidden="true"
                                            >
                                                {isOpen ? '−' : '+'}
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="border-t border-neutral-100 px-5 py-4">
                                                <p className="text-sm leading-6 text-neutral-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    <p className="mt-6 text-sm text-neutral-500">
                        Showing {filteredFAQs.length} of {mockFAQs.length}{' '}
                        frequently asked questions.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default FAQPage;