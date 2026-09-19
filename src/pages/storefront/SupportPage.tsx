import { FormEvent, useState } from 'react';

import { storageService, STORAGE_KEYS } from '@/services/storage';
import type { SupportRequest } from '@/types';

interface SupportFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const initialFormData: SupportFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const SupportPage = () => {
    const [formData, setFormData] =
        useState<SupportFormData>(initialFormData);

    const [errors, setErrors] = useState<
        Partial<Record<keyof SupportFormData, string>>
    >({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        field: keyof SupportFormData,
        value: string,
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: undefined,
        }));

        setIsSubmitted(false);
    };

    const validate = (): boolean => {
        const nextErrors: Partial<
            Record<keyof SupportFormData, string>
        > = {};

        if (!formData.name.trim()) {
            nextErrors.name = 'Name is required.';
        }

        if (!formData.email.trim()) {
            nextErrors.email = 'Email is required.';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim(),
            )
        ) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!formData.subject.trim()) {
            nextErrors.subject = 'Subject is required.';
        }

        if (!formData.message.trim()) {
            nextErrors.message = 'Message is required.';
        } else if (formData.message.trim().length < 10) {
            nextErrors.message =
                'Message must contain at least 10 characters.';
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const existingRequests =
            storageService.getItem<SupportRequest[]>(
                STORAGE_KEYS.SUPPORT_REQUESTS,
                [],
            );

        const newRequest: SupportRequest = {
            id: `support-${Date.now()}`,
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            status: 'open',
            createdAt: new Date().toISOString(),
        };

        storageService.setItem(
            STORAGE_KEYS.SUPPORT_REQUESTS,
            [...existingRequests, newRequest],
        );

        setFormData(initialFormData);
        setErrors({});
        setIsSubmitted(true);
    };

    return (
        <main>
            <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                        Customer Support
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        How can we help?
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-300">
                        Have a question or need help with an order? Send us a
                        message and our support team can review your request.
                    </p>
                </div>
            </section>

            <section className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <aside>
                        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                            Support
                        </p>

                        <h2 className="mt-3 text-2xl font-bold text-neutral-900">
                            Tell us what you need.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-neutral-600">
                            Provide a few details about your question or
                            issue. Your support request will be saved securely
                            in this browser for this frontend-only application.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                                <h3 className="font-semibold text-neutral-900">
                                    Before contacting support
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-neutral-600">
                                    Check our FAQ page for answers to common
                                    questions about orders, payments, and
                                    shipping.
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                                <h3 className="font-semibold text-neutral-900">
                                    Order assistance
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-neutral-600">
                                    Include your order information in the
                                    message when contacting us about a specific
                                    purchase.
                                </p>
                            </div>
                        </div>
                    </aside>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                        {isSubmitted && (
                            <div
                                role="status"
                                className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                            >
                                Your support request has been submitted
                                successfully.
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="support-name"
                                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="support-name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(event) =>
                                            handleChange(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Your name"
                                        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900"
                                    />

                                    {errors.name && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="support-email"
                                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="support-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(event) =>
                                            handleChange(
                                                'email',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900"
                                    />

                                    {errors.email && (
                                        <p className="mt-1.5 text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="support-subject"
                                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                                >
                                    Subject
                                </label>

                                <input
                                    id="support-subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={(event) =>
                                        handleChange(
                                            'subject',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="What do you need help with?"
                                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900"
                                />

                                {errors.subject && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="support-message"
                                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="support-message"
                                    value={formData.message}
                                    onChange={(event) =>
                                        handleChange(
                                            'message',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Describe your question or issue..."
                                    rows={6}
                                    className="w-full resize-y rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900"
                                />

                                {errors.message && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
                            >
                                Submit Support Request
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SupportPage;