import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { RealtimeChannel } from "@supabase/supabase-js";

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

// Enable realtime for specific tables
export const setupRealtimeSubscriptions = async () => {
  // Enable realtime for symptoms, appointments, and treatments tables
  await supabase.rpc('supabase_realtime', { table: 'symptoms', insert: true, update: true, delete: true });
  await supabase.rpc('supabase_realtime', { table: 'appointments', insert: true, update: true, delete: true });
  await supabase.rpc('supabase_realtime', { table: 'treatments', insert: true, update: true, delete: true });
  await supabase.rpc('supabase_realtime', { table: 'profiles', insert: true, update: true, delete: true });
};

// Helper to create a subscription channel
export const createSubscription = (
  table: string, 
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  callback: (payload: any) => void
): RealtimeChannel => {
  const channel = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { 
      event: event, 
      schema: 'public', 
      table: table 
    }, callback)
    .subscribe();
  
  return channel;
};

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
  },
  
  // Add subscription to profile changes
  subscribeToProfileChanges: (userId: string, callback: (payload: any) => void) => {
    return createSubscription('profiles', '*', (payload) => {
      if (payload.new.id === userId) {
        callback(payload);
      }
    });
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
  },
  
  // Add subscription to symptom changes
  subscribeToSymptomChanges: (userId: string, callback: (payload: any) => void) => {
    return createSubscription('symptoms', '*', (payload) => {
      if (payload.new.user_id === userId) {
        callback(payload);
      }
    });
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
  },
  
  // Add subscription to appointment changes
  subscribeToAppointmentChanges: (userId: string, callback: (payload: any) => void) => {
    return createSubscription('appointments', '*', (payload) => {
      if (payload.new.user_id === userId) {
        callback(payload);
      }
    });
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
  },
  
  // Add subscription to treatment changes
  subscribeToTreatmentChanges: (userId: string, callback: (payload: any) => void) => {
    return createSubscription('treatments', '*', (payload) => {
      if (payload.new.user_id === userId) {
        callback(payload);
      }
    });
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
