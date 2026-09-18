import { Link, useParams } from 'react-router-dom';

const OrderSuccessPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-neutral-900">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-neutral-600">
          Thank you for your purchase. Your order has been created
          successfully.
        </p>

        <div className="mt-6 rounded-lg bg-neutral-50 p-4">
          <p className="text-sm text-neutral-500">
            Order ID
          </p>

          <p className="mt-1 font-bold text-neutral-900">
            {id}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="rounded-lg border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Continue Shopping
          </Link>

          <Link
            to={`/orders/${id}`}
            className="rounded-lg bg-neutral-900 px-5 py-3 font-semibold text-white hover:bg-neutral-700"
          >
            View Order
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;