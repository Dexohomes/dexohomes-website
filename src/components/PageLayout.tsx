
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useReveal } from "@/hooks/useReveal";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
  const revealRef = useReveal();
  
  return (
    <div ref={revealRef} className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow pt-24 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
