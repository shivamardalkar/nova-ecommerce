import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { restoreSession } from '@/store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-6 text-white">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">NOVA</p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">E-Commerce Platform</h1>

        <p className="mt-4 text-neutral-400">React + TypeScript + Vite + Tailwind CSS</p>
      </div>
    </main>
  );
}

export default App;
