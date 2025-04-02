import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hwzbwszxsfqycxzafdsa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3emJ3c3p4c2ZxeWN4emFmZHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NTM1NTAsImV4cCI6MjA1OTEyOTU1MH0.-zDTORsxCBd7POWMd4-gBcfk3SFtuFQBEIYYSRkbYPE";
export const supabase = createClient(supabaseUrl, supabaseKey);
