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

export const listLinks = async (userId: string) => {
  const { data, error } = await client.from("Links").select().eq("user_id", userId);
  if (!error) {
    return data;
  } else {
    return error;
  }
};
export const sendLink = async (formData: {title: string, handleURL: string, logoURL: string}, userId: string) => {
  if (!formData.title) return;
  const {data, error} = await client.from("Links").insert({
    title: formData.title,
    handleURL: formData.handleURL,
    logoURL: formData.logoURL,
    user_id: userId,
  });
  if(error){
    console.log("Error adding link")
    return error.message
  }
  else{
    return data
  }
};
export const listContacts = async (userId: string) => {
  const { data, error } = await client.from("Contacts").select().eq("user_id", userId);
  if (!error) {
    return data;
  } else {
    console.log("Error fetching contacts: ", error.message)
    return error;
  }
};
export const sendContact = async (formData: {title: string, value: string, logoURL?: string}, userId: string) => {
  if (!formData.title) return;
  const {data, error} = await client.from("Contacts").insert({
    title: formData.title,
    value: formData.value,
    logoURL: formData?.logoURL,
    user_id: userId,
  });
  if(error){
    console.log("Error adding contact")
    return error.message
  }
  else{
    return data
  }
};



export const uploadImageAndSaveURL = async (imageFile:File, userId: string) => {
  if(!imageFile || !userId){
    return "Image and UserId are required"
  }
  const { data, error } = await client.storage
      .from('images')
      .upload(`images/${userId}/${(Date.now())+imageFile.name}`, imageFile);

  if (error) {
      console.error('Error uploading image:', error.message);
      return;
  }
  const imageURL = data.fullPath;

  const { data: imageData, error: imageError } = await client
      .from('Images')
      .insert([{ user_id: userId, imageURL: imageURL }]);

  if (imageError) {
      console.error('Error saving imageURL to database:', imageError.message);
      return imageError.message;
  }
  else{
    console.log('Image uploaded and URL saved successfully:', imageURL);
    return {success: true, imageData: imageData}
  }

}


export const listImageURLs = async (userId: string) => {
  const bucketURL = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  try {
    const { data: images, error } = await client
      .from('Images')
      .select('imageURL')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }
    const imageURLs = images.map((image) => bucketURL+image.imageURL);
    return imageURLs;
  } catch (error) {
    console.error('Error fetching image URLs:', error.message);
    return error.message;
  }
};