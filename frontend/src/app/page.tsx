"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-2xl font-semibold mb-3 text-gray-900">
          Cardiovascular Risk Predictor
        </h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Estimate your cardiovascular risk using key health metrics including
          blood pressure, BMI, and lifestyle factors.
        </p>

        <Link
          href="/predictor"
          className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
