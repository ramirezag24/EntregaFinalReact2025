import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";  


export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}
