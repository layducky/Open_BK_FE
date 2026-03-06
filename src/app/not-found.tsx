import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <span className="text-8xl font-black text-slate-200 select-none">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Page not found
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-dodger-blue-500 text-white font-semibold hover:bg-dodger-blue-600 transition shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/course"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 hover:border-slate-400 transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </main>
  );
}
