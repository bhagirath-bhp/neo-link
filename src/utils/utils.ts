import {
  FbLogoWhiteOutlined,
  IgLogoWhiteOutlined,
  LnLogoWhiteOutlined,
  MailBlackOutlined,
  PhoneBlackOutlined,
  WebsiteBlackOutlined,
  WpLogoWhiteOutlined,
} from "@/assets";
import { Ref, RefObject } from "react";

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
  for (let i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
};

export const generateGrad = () => {
  let colorOne = randomColor();
  let colorTwo = randomColor();
  let angle = Math.floor(Math.random() * 360);
  const outputCode = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  return { outputCode, colorOne, colorTwo };
};

export const handleIcons: any = {
  instagram: IgLogoWhiteOutlined,
  whatsapp: WpLogoWhiteOutlined,
  facebook: FbLogoWhiteOutlined,
  linkedin: LnLogoWhiteOutlined,
  website: WebsiteBlackOutlined,
  phone: PhoneBlackOutlined,
  mail: MailBlackOutlined,
};

export const generateProfileURL = (userId: string | undefined) => {
  const profileURL = import.meta.env.VITE_APP_LINKSPAGE_URL + `/${userId}`;
  return profileURL;
};

export const generateHandleURL = (url: string, type: string) => {
  if (type === "phone") {
    return `tel:${url}`;
  } else if (type === "mail") {
    return `mailto:${url}`;
  } else {
    return url;
  }
};

export const wrapTextWithEllipsis = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const updateMaxChars = (textContainerRef: any, setMaxChars: any) => {
  if (textContainerRef.current) {
    const containerWidth = textContainerRef.current.offsetWidth;
    const testSpan = document.createElement('span');
    testSpan.style.visibility = 'hidden';
    testSpan.style.whiteSpace = 'nowrap';
    testSpan.style.position = 'absolute';
    document.body.appendChild(testSpan);
    
    testSpan.style.font = getComputedStyle(textContainerRef.current).font;
    testSpan.style.fontSize = getComputedStyle(textContainerRef.current).fontSize;

    let charWidth = 0;
    for (let i = 1; i < 100; i++) {
      testSpan.textContent = 'W'.repeat(i);
      charWidth = testSpan.offsetWidth / i;
      if (charWidth >= containerWidth) {
        setMaxChars(i - 1);
        break;
      }
    }

    document.body.removeChild(testSpan);
  }
};
