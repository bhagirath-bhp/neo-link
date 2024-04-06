import { FbLogoWhiteOutlined, IgLogoWhiteOutlined, LnLogoWhiteOutlined, MailBlackOutlined, PhoneBlackOutlined, WebsiteBlackOutlined, WpLogoWhiteOutlined } from "@/assets";


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
  
  

let hexString = "0123456789abcdef";
export const randomColor = () => {
    let hexCode = "#";
    for(let i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}

export const generateGrad = () => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    const outputCode = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
    return {outputCode, colorOne, colorTwo};
}


export const handleIcons = {
  "instagram": IgLogoWhiteOutlined,
  "whatsapp": WpLogoWhiteOutlined,
  "facebook": FbLogoWhiteOutlined,
  "linkedin": LnLogoWhiteOutlined,
  "website": WebsiteBlackOutlined,
  "phone": PhoneBlackOutlined,
  "mail": MailBlackOutlined,
}