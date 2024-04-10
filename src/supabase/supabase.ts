import Cookie from "js-cookie";
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
    import.meta.env.VITE_SUPABASE_KEY!
    // {
    //   global: {
    //     // Get the Supabase token with a custom fetch method
    //     fetch: async (url, options = {}) => {
    //       const clerkToken = await window.Clerk.session?.getToken({
    //         template: "supabase",
    //       });

    //       // Construct fetch headers
    //       const headers = new Headers(options?.headers);
    //       headers.set("Authorization", `Bearer ${clerkToken}`);

    //       // Now call the default fetch
    //       const response = await fetch(url, {
    //         ...options,
    //         headers,
    //       });

    //       // Return the response object directly
    //       return response;
    //     },
    //   },
    // }
  );
}
function createAuthenticClerkSupabaseClient() {
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
export const authClient = createAuthenticClerkSupabaseClient();

export const getUserData = async (userId: string | undefined) => {

  const { data, error } = await client
    .from("users")
    .select()
    .eq("user_id", userId);
    
  if (!error) {
    return data;
  } else {
    return error;
  }
};
export const listLinks = async (userId: string | undefined) => {
  const { data, error } = await client
    .from("Links")
    .select()
    .eq("user_id", userId);
  if (!error) {
    return data;
  } else {
    return error;
  }
};
export const sendLink = async (
  formData: { title: string; handleURL: string; logoURL: string },
  userId: string
) => {
  if (!formData.title) return;
  const { data, error } = await authClient.from("Links").insert({
    title: formData.title,
    handleURL: formData.handleURL,
    logoURL: formData.logoURL,
    user_id: userId,
  });
  if (error) {
    console.log("Error adding link");
    return error.message;
  } else {
    return data;
  }
};
export const deleteLink = async (linkId: string, userId: string | undefined) => {
  const response = await authClient
    .from("Links")
    .delete()
    .eq("user_id", userId)
    .eq("id", linkId);
  return response
};

export const listContacts = async (userId: string | undefined) => {
  const { data, error } = await client
    .from("Contacts")
    .select()
    .eq("user_id", userId);
  if (!error) {
    return data;
  } else {
    console.log("Error fetching contacts: ", error.message);
    return error;
  }
};
export const sendContact = async (
  formData: { title: string; value: string; logoURL?: string },
  userId: string
) => {
  if (!formData.title) return;
  const { data, error } = await authClient.from("Contacts").insert({
    title: formData.title,
    value: formData.value,
    logoURL: formData?.logoURL,
    user_id: userId,
  });
  if (error) {
    console.log("Error adding contact");
    return error.message;
  } else {
    return data;
  }
};

export const deleteContact = async (contactId: string, userId: string) => {
  console.log(contactId, userId)
  const response = await authClient
    .from("Contacts")
    .delete()
    .eq("user_id", userId)
    .eq("id", contactId);
  // if (error) {
  //   console.log("Error in deleting contact");
  //   return error.message;
  // } else {
  //   console.log("success")
  //   return data;
  // }
  return response
};

export const uploadImageAndSaveURL = async (
  imageFile: File,
  userId: string
) => {
  if (!imageFile || !userId) {
    return "Image and UserId are required";
  }
  const { data, error } = await authClient.storage
    .from("images")
    .upload(`images/${userId}/${Date.now() + imageFile.name}`, imageFile);

  if (error) {
    
    console.error("Error uploading image:", error.message);
    return;
  }
  const imageURL = data.fullPath;

  const { data: imageData, error: imageError } = await authClient
    .from("Images")
    .insert([{ user_id: userId, imageURL: imageURL }]);

  if (imageError) {
    console.error("Error saving imageURL to database:", imageError.message);
    return imageError.message;
  } else {
    console.log("Image uploaded and URL saved successfully:", imageURL);
    return { success: true, imageData: imageData };
  }
};

export const listImageURLs = async (userId: string) => {
  const bucketURL = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  try {
    const { data: images, error } = await client
      .from("Images")
      .select("imageURL")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }
    const imageURLs = images.map((image) => bucketURL + image.imageURL);
    return imageURLs;
  } catch (error) {
    console.error("Error fetching image URLs:", error.message);
    return error.message;
  }
};
export const deleteImage = async (
  imageId: string,
  imageURL: string,
  userId: string
) => {
  const { data, error } = await authClient
    .from("Images")
    .delete()
    .eq("user_id", userId)
    .eq("id", imageId);
  if (error) {
    console.error("Error uploading image:", error.message);
    return;
  }
  const { data: imageData, error: imageError } = await client.storage
    .from("images")
    .remove([imageURL]);

  if (imageError) {
    console.error("Error deleting imageURL from database:", imageError.message);
    return imageError.message;
  } else {
    console.log("Image and URL deleted successfully:", imageURL);
    return { success: true, imageData: imageData };
  }
};

export const checkUserExists = async (userId: string) => {
  try {
    const { data, error } = await client
      .from("users")
      .select("user_id")
      .eq("user_id", userId)
      .single();

    return { exists: !!data, error };
  } catch (error) {
    return { exists: false, error };
  }
};

export const saveUserDetails = async (userData) => {
  try {
    const { exists, error } = await checkUserExists(userData.user_id);

    if (error) {
      throw error;
    }

    if (!exists) {
      const { data, error: insertError } = await client
        .from("users")
        .insert(userData);

      if (insertError) {
        throw insertError;
      }

      return data;
    } else {
      console.log("User already exists in the database.");
      return null;
    }
  } catch (error) {
    console.error("Error saving user details:", error.message);
    return null;
  }
};
