
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import CtaPopup from './CtaPopup';
import { ArrowRight } from 'lucide-react';

interface EnhancedCtaProps {
  backgroundImage?: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  source?: string;
  imagePosition?: 'left' | 'right';
}

const EnhancedCta = ({
  backgroundImage = "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&q=80&w=2000",
  title,
  description,
  buttonText,
  className,
  source = "Enhanced CTA Section",
  imagePosition = 'right'
}: EnhancedCtaProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className={`relative py-16 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-8 items-center ${imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
            <p className="text-lg text-gray-700">{description}</p>
            <Button 
              size="lg" 
              onClick={() => setIsPopupOpen(true)}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black group"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className={`relative h-64 md:h-96 rounded-xl overflow-hidden ${imagePosition === 'left' ? 'md:order-first' : ''}`}>
            <img 
              src={backgroundImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </div>
      
      <CtaPopup
        open={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        source={source}
      />
    </section>
  );
};

export default EnhancedCta;
