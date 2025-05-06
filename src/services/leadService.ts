
import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  status: string;
  message?: string;
}

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
  
  return data;
}

export async function updateLeadStatus(id: number, status: string) {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
  
  return true;
}

export async function saveLead(lead: Omit<Lead, 'id' | 'date' | 'status'>) {
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
  
  return true;
}
