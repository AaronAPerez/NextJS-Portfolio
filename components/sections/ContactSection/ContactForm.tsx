'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";

export const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form
      role="form"
      aria-label="Contact form"
      noValidate
      className="space-y-6"
    >
      <div>
        <label 
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            "mt-1 block w-full rounded-md",
            errors.email && "border-red-500"
          )}
        />
        {errors.email && (
          <p 
            id="email-error" 
            role="alert"
            className="mt-1 text-sm text-red-500"
          >
            {errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        aria-label="Send message"
        className="w-full rounded-md bg-blue-500 px-4 py-2"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm