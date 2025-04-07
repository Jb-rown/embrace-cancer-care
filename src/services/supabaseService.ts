import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { RealtimeChannel } from "@supabase/supabase-js";
import { BlogPost } from "@/pages/Blog";

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
type TreatmentUpdate = Database['public']['Tables']['treatments']['Update'];

// Type for blog post data
type BlogPostInsert = Omit<BlogPost, 'id'>;
type BlogPostUpdate = Partial<BlogPostInsert>;

// Enable realtime for specific tables
export const setupRealtimeSubscriptions = async () => {
  try {
    // Enable realtime for symptoms, appointments, treatments, and blog posts tables
    await supabase.channel('table-db-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'symptoms'
      }, () => {})
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'appointments'
      }, () => {})
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'treatments'
      }, () => {})
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'blog_posts'
      }, () => {})
      .subscribe();
      
    console.info("Real-time subscriptions set up successfully");
  } catch (error) {
    console.error("Error setting up realtime subscriptions:", error);
  }
};

// Helper to create a subscription channel
export const createSubscription = (
  table: string, 
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  callback: (payload: any) => void
): RealtimeChannel => {
  // Creating a properly named channel for this subscription
  const channel = supabase.channel(`${table}-changes`);
  
  // Add the subscription to the channel
  channel.on(
    'postgres_changes', 
    { 
      event: event, 
      schema: 'public', 
      table: table 
    }, 
    callback
  ).subscribe();
  
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
  
  async updateTreatment(id: string, updates: TreatmentUpdate) {
    const { error } = await supabase
      .from('treatments')
      .update(updates)
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  },
  
  async deleteTreatment(id: string) {
    const { error } = await supabase
      .from('treatments')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  },
  
  subscribeToTreatmentChanges: (userId: string, callback: (payload: any) => void) => {
    return createSubscription('treatments', '*', (payload) => {
      if (payload.new && payload.new.user_id === userId) {
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

export const blogService = {
  async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return data as BlogPost[];
  },
  
  async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return data as BlogPost;
  },
  
  async addBlogPost(blogData: BlogPostInsert) {
    const { error } = await supabase
      .from('blog_posts')
      .insert(blogData);
      
    if (error) throw error;
    
    return true;
  },
  
  async updateBlogPost(id: string, updates: BlogPostUpdate) {
    const { error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  },
  
  async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  },
  
  subscribeToBlogChanges: (callback: (payload: any) => void) => {
    return createSubscription('blog_posts', '*', callback);
  }
};
