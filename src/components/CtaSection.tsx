
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CtaSectionProps = {
  variant?: "primary" | "secondary";
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  buttonLink?: string;
};

const CtaSection = ({
  variant = "primary",
  title,
  description,
  buttonText,
  className,
  buttonLink = "/price-calculator",
}: CtaSectionProps) => {
  return (
    <section
      className={cn(
        "py-16",
        variant === "primary"
          ? "bg-brand-yellow text-black"
          : "bg-brand-dark text-white",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className={cn("text-lg mb-8", variant === "secondary" && "text-gray-300")}>
            {description}
          </p>
          <Button
            size="lg"
            className={cn(
              "px-8 py-6 text-lg",
              variant === "primary"
                ? "bg-black hover:bg-black/90 text-white"
                : "bg-brand-yellow hover:bg-brand-yellow/90 text-black"
            )}
            asChild
          >
            <Link to={buttonLink}>
              {buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
