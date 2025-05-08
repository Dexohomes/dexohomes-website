
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import QuickContactForm from "./QuickContactForm";

type PopupContactFormProps = {
  onClose: () => void;
  source?: string;
}

const PopupContactForm = ({ onClose, source = "Popup Form" }: PopupContactFormProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close popup"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Get Your Free Consultation</h2>
          <p className="text-gray-600">Our experts will contact you shortly to discuss your requirements</p>
        </div>
        
        <QuickContactForm source={source} />
      </div>
    </div>
  );
};

export default PopupContactForm;
