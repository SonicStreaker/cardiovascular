"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FormData {
  age: string;
  height: string;
  weight: string;
  ap_hi: string;
  ap_lo: string;
  cholesterol: string;
  gluc: string;
  smoke: string;
  alco: string;
  active: string;
  gender: string;
}

interface PredictionResult {
  risk_probability: number;
  risk_label: string;
}

export default function Predictor() {
  const [form, setForm] = useState<FormData>({
    age: "",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "1",
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "1",
    gender: "1",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
        ap_hi: Number(form.ap_hi),
        ap_lo: Number(form.ap_lo),
        cholesterol: Number(form.cholesterol),
        gluc: Number(form.gluc),
        smoke: Number(form.smoke),
        alco: Number(form.alco),
        active: Number(form.active),
        gender: Number(form.gender),
      };

      const res = await axios.post(`${API_URL}/predict`, payload);
      setResult(res.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Error connecting to server";
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h1 className="text-xl font-semibold mb-6 text-gray-900">
            Cardiovascular Risk Assessment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Age (days)
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Systolic BP (ap_hi)
                </label>
                <input
                  type="number"
                  name="ap_hi"
                  value={form.ap_hi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Diastolic BP (ap_lo)
                </label>
                <input
                  type="number"
                  name="ap_lo"
                  value={form.ap_lo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cholesterol
                </label>
                <select
                  name="cholesterol"
                  value={form.cholesterol}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="1">Normal</option>
                  <option value="2">Above Normal</option>
                  <option value="3">Well Above Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Glucose
                </label>
                <select
                  name="gluc"
                  value={form.gluc}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="1">Normal</option>
                  <option value="2">Above Normal</option>
                  <option value="3">Well Above Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Smoking
                </label>
                <select
                  name="smoke"
                  value={form.smoke}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Alcohol
                </label>
                <select
                  name="alco"
                  value={form.alco}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Physical Activity
                </label>
                <select
                  name="active"
                  value={form.active}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Predicting..." : "Predict Risk"}
            </button>
          </form>

          {result && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Risk Assessment</p>
                <p className="text-lg font-semibold mb-1">
                  <span
                    className={
                      result.risk_label === "High Risk"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {result.risk_label}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Probability: {(result.risk_probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
