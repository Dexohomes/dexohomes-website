
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
  source?: string;
}

export async function getLeads(): Promise<Lead[]> {
  try {
    console.log("Fetching leads from Supabase...");
    
    // Fetch all leads with better error handling
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching leads:', error);
      console.error('Error details:', JSON.stringify(error));
      throw error;
    }
    
    if (!data) {
      console.log("No leads data returned");
      return [];
    }
    
    console.log(`Successfully fetched ${data.length} leads. Data:`, data);
    return data;
  } catch (error) {
    console.error('Error in getLeads function:', error);
    throw error; // Propagate error for better debugging
  }
}

export async function updateLeadStatus(id: number, status: string): Promise<boolean> {
  try {
    console.log(`Updating lead ${id} status to ${status}`);
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating lead status:', error);
      console.error('Error details:', JSON.stringify(error));
      throw error;
    }
    
    console.log(`Lead ${id} status updated successfully`);
    return true;
  } catch (error) {
    console.error('Error in updateLeadStatus function:', error);
    throw error;
  }
}

export async function getLeadById(id: number): Promise<Lead | null> {
  try {
    console.log(`Fetching lead ${id} details`);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching lead:', error);
      console.error('Error details:', JSON.stringify(error));
      throw error;
    }
    
    console.log('Lead details fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in getLeadById function:', error);
    throw error;
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<boolean> {
  try {
    console.log("Saving lead with data:", JSON.stringify(lead));
    
    // Ensure all required fields are present
    if (!lead.name || !lead.phone || !lead.location || !lead.service) {
      console.error("Missing required fields in lead data");
      throw new Error("Missing required fields: name, phone, location and service are required");
    }
    
    // Insert lead with explicit RLS bypass using service_role if needed
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          ...lead, 
          status: 'New',
          source: lead.source || 'Website Form'
        }
      ]);
    
    if (error) {
      console.error('Error saving lead:', error);
      console.error('Error details:', JSON.stringify(error));
      throw error;
    }
    
    console.log("Lead saved successfully");
    return true;
  } catch (error) {
    console.error('Error in saveLead function:', error);
    throw error;
  }
}
