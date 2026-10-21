"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in - placeholder for actual auth implementation
    console.log("Sign in attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/navable-logo.png"
              alt="Navable"
              width={160}
              height={40}
              className="h-10 w-auto mx-auto"
            />
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to access your Navable account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5046e5] focus:border-transparent outline-none transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5046e5] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#5046e5] focus:ring-[#5046e5] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#5046e5] hover:text-[#3d36b8]"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[#5046e5] text-white font-semibold hover:bg-[#3d36b8] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5046e5]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/demo"
                className="font-medium text-[#5046e5] hover:text-[#3d36b8]"
              >
                Request a demo
              </Link>
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Need help?{" "}
          <a
            href="mailto:support@navable.com"
            className="text-[#5046e5] hover:text-[#3d36b8]"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
