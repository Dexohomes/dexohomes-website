
import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  location: string;
  created_at: string;
  status: string;
  message?: string;
}

export async function getLeads(): Promise<Lead[]> {
  try {
    console.log("Fetching leads...");
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
    
    console.log("Leads fetched successfully:", data);
    return data || [];
  } catch (error) {
    console.error('Error in getLeads function:', error);
    throw error;
  }
}

export async function updateLeadStatus(id: number, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateLeadStatus function:', error);
    throw error;
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<boolean> {
  try {
    console.log("Saving lead:", lead);
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          ...lead, 
          status: 'New',
        }
      ]);
    
    if (error) {
      console.error('Error saving lead:', error);
      throw error;
    }
    
    console.log("Lead saved successfully");
    return true;
  } catch (error) {
    console.error('Error in saveLead function:', error);
    throw error;
  }
}
