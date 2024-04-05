import Cookie from 'js-cookie';
import { createClient } from "@supabase/supabase-js";


// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any;
  }
}

function createClerkSupabaseClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!,
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk.session?.getToken({
            template: "supabase",
          });

          // Construct fetch headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          // Now call the default fetch
          const response = await fetch(url, {
            ...options,
            headers,
          });

          // Return the response object directly
          return response;
        },
      },
    }
  );
}

export const client = createClerkSupabaseClient();

export const listLinks = async () => {
  console.log("hii");
  const { data, error } = await client.from("Links").select();
  if (!error) {
    return data;
  } else {
    return error;
  }
};
export const sendLink = async (formData: {title: string, handleURL: string, logoURL: string}) => {
  if (!formData.title) return;
  const response = await client.from("Links").insert({
    title: formData.title,
    handleURL: formData.handleURL,
    logoURL: formData.logoURL,
    user_id: Cookie.get("ajs_user_id"),
  });
  return response;
};