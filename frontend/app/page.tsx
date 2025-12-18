export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass max-w-3xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold">
          Maximize Your <span className="text-primary">Earnings</span>
        </h1>

        <p className="mt-4 text-muted">
          Smart URL shortener with analytics, earnings & tools
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-xl bg-primary px-6 py-3 text-white">
            Get Started
          </button>

          <button className="rounded-xl border px-6 py-3">
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
