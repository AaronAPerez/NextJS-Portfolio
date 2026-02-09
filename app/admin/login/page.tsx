"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon";



export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ password: false });

  // Real-time password validation
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };


  // Handle password change with validation
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      validatePassword(value);
    }
  };


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ password: true });

    const isPasswordValid = validatePassword(password);

    if (!password.trim()) {
      toast.error('Please fix the errors before submitting');
      setError("Password is required");
      return;
    }

    if (!isPasswordValid) {
      toast.error('Please fix the errors before submitting');
      return;
    }


    setIsLoading(true);
    const toastId = toast.loading('Signing in...');

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        toast.success('Successfully signed in!', { id: toastId });
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        const errorMsg = data.error || "Incorrect password";
        setError(errorMsg);
        toast.error(errorMsg, { id: toastId });
      }
    } catch (err) {
      const errorMsg = "An error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <>
      <Toaster
        position="top-right"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        
            <h1 className="text-3xl font-bold text-center text-gray-900">
              Admin Login
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your admin password to continue
            </p>
         

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => setTouched({ password: true })}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 ${passwordError && touched.password
                      ? 'border-red-400 ring-2 ring-red-100 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {passwordError && touched.password && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {passwordError}
              </p>
            )}
     


        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !password.trim()}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </form>
    </div >
    </div >
    </>
  );
}

