// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hfodsphtzyeczukolybi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmb2RzcGh0enllY3p1a29seWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTA0MDksImV4cCI6MjA1OTMyNjQwOX0.Jw2pGWhHXUdTOA0PLuryA-mNdo4j8yWQS78SanUEZo4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);