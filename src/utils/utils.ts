export const fetchUserDetails = async () => {
  const userData = await window.Clerk.user;
  if (userData) {
    const temp: { fullName: string; imageURL: string; userId?: string } = {
      fullName: userData.fullName,
      imageURL: userData.imageUrl,
      userId: userData.id,
    };
    return temp;
  }
};

