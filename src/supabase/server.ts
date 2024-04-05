
import { createClient } from '@supabase/supabase-js'

const serverURI = import.meta.env.VITE_APP_BASE_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;
const supabase = createClient(serverURI, apiKey);