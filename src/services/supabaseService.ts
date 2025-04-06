
import { supabase } from "@/integrations/supabase/client";

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
  
  async updateProfile(userId: string, updates: any) {
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
  
  async addSymptom(symptomData: any) {
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
  
  async addAppointment(appointmentData: any) {
    const { error } = await supabase
      .from('appointments')
      .insert(appointmentData);
      
    if (error) throw error;
    
    return true;
  },
  
  async updateAppointment(id: string, updates: any) {
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
  
  async addTreatment(treatmentData: any) {
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
  async submitContactForm(formData: any) {
    const { error } = await supabase
      .from('contact_submissions')
      .insert(formData);
      
    if (error) throw error;
    
    return true;
  }
};
