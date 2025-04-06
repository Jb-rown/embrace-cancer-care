
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Type for profile updates
type ProfileUpdate = {
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  updated_at?: string;
};

// Type for symptom data
type SymptomInsert = Database['public']['Tables']['symptoms']['Insert'];

// Type for appointment data
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];

// Type for treatment data
type TreatmentInsert = Database['public']['Tables']['treatments']['Insert'];

export const profileService = {
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("No user logged in");
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return data;
  },
  
  async updateProfile(userId: string, updates: ProfileUpdate) {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    
    return true;
  }
};

export const symptomService = {
  async getSymptoms(userId: string) {
    const { data, error } = await supabase
      .from('symptoms')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false });
      
    if (error) throw error;
    
    return data;
  },
  
  async addSymptom(symptomData: SymptomInsert) {
    const { error } = await supabase
      .from('symptoms')
      .insert(symptomData);
      
    if (error) throw error;
    
    return true;
  }
};

export const appointmentService = {
  async getAppointments(userId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .order('appointment_date', { ascending: true });
      
    if (error) throw error;
    
    return data;
  },
  
  async addAppointment(appointmentData: AppointmentInsert) {
    const { error } = await supabase
      .from('appointments')
      .insert(appointmentData);
      
    if (error) throw error;
    
    return true;
  },
  
  async updateAppointment(id: string, updates: AppointmentUpdate) {
    const { error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  },
  
  async deleteAppointment(id: string) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  }
};

export const treatmentService = {
  async getTreatments(userId: string) {
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });
      
    if (error) throw error;
    
    return data;
  },
  
  async addTreatment(treatmentData: TreatmentInsert) {
    const { error } = await supabase
      .from('treatments')
      .insert(treatmentData);
      
    if (error) throw error;
    
    return true;
  }
};

export const resourceService = {
  async getResources() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data;
  }
};

export const contactService = {
  async submitContactForm(formData: Database['public']['Tables']['contact_submissions']['Insert']) {
    const { error } = await supabase
      .from('contact_submissions')
      .insert(formData);
      
    if (error) throw error;
    
    return true;
  }
};
