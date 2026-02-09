"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  phone: string;
  address: string;
  projectType: string;
  description: string;
};

const projectTypes = [
  "Junk Removal",
  "Garage Cleanout",
  "Estate Cleanout",
  "Dumpster Rental",
  "Demolition",
  "Other"
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: `${data.phone}@phone-only.local`, // Placeholder for phone-only submissions
          projectType: data.projectType,
          message: `Address: ${data.address}\n\nDescription:\n${data.description || "Not provided"}`,
          source: "/contact",
          formTimestamp: Date.now()
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-bold text-gray-900">Request Sent!</h3>
        <p className="mt-2 text-sm text-gray-700">
          Your email client should have opened with your request. We typically respond within 2 hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="John Smith"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[\d\s\-\(\)]+$/,
              message: "Please enter a valid phone number"
            }
          })}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="(630) 555-1234"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Service Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          {...register("address", { required: "Address is required" })}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="123 Main St, Bartlett, IL 60103"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
          Project Type <span className="text-red-500">*</span>
        </label>
        <select
          id="projectType"
          {...register("projectType", { required: "Please select a project type" })}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          <option value="">Select a service...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="mt-1 text-xs text-red-600">{errors.projectType.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Tell Us About Your Project
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="Describe what you need removed, approximate volume, access notes, etc."
        />
        <p className="mt-1 text-xs text-gray-500">
          Tip: Photos help us give faster, more accurate quotes. Text them to (630) 396-4175.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700 disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Request Quote"}
      </button>
    </form>
  );
}
