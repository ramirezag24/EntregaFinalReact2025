import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <main className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        {children}
      </main>
    </div>
  );
}