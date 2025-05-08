
import { toast } from "sonner";

/**
 * Standardized error handling for Supabase errors
 */
export const handleSupabaseError = (error: any, context: string): void => {
  console.error(`Error in ${context}:`, error);
  
  // Format the error message
  let errorMessage = "An unexpected error occurred";
  
  if (error?.message) {
    errorMessage = error.message;
  }
  
  if (error?.code) {
    errorMessage += ` (${error.code})`;
  }
  
  // For RLS violations
  if (errorMessage.includes("new row violates row-level security") || 
      errorMessage.includes("permission denied")) {
    errorMessage = "Permission error: Cannot access this data. Please check your login status.";
  }
  
  // Show toast notification
  toast.error(`Error: ${context}`, {
    description: errorMessage,
  });
};
