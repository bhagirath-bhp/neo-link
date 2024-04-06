import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { listLinks } from "@/supabase/supabase";
import { AddLink } from "@/components/AddLink";
import { Banner1 } from "@/assets";
import Navbar from "@/components/Navbar";
import LinkCard from "@/components/LinkCard";
import ImageCarousel from "@/components/ImageCarousel";
import Cookies from "js-cookie";
import ContactCard from "@/components/ContactCard";
// import { generateGrad } from "@/utils/utils";

const Links = () => {

  // useEffect(()=>{
    
  // })

  const [user, setUser] = useState<{
    fullName: string;
    imageURL: string;
    userId?: string;
  }>({ fullName: "", imageURL: "", userId: "" });
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await window.Clerk?.user;
      if (userData) {
        const temp = {
          fullName: userData.fullName,
          imageURL: userData.imageUrl,
          userId: userData.id,
        };
        Cookies.set("userId", temp.userId);
        setUser(temp);
      }
    };
    const fetchLinks = async () => {
      const response = await listLinks(user.userId);
      setLinks(response);
    };

    fetchUserDetails();
    fetchLinks();
  }, []);

  const linkElements = (Array.isArray(links)) && links?.map((item) => (
    <LinkCard
      key={item.id}
      title={item.title}
      url={item.url}
      type={item.type}
      imageURL={item.imageURL}
    />
  ));
  return (linkElements && user) ? (
    <div className="links-wrapper flex flex-col items-center justify-evenly bg-black h-full w-full">
      <Navbar />
      <div className="profile flex flex-col justify-evenly gap-[5rem]">
        <div
          className="relative head h-[30vh] w-[95vw] flex justify-center items-end rounded-[1rem] border-[1px]"
          style={{ background: `url("${Banner1}")`, backgroundSize: "cover" }}
        >
          <div className="profile-img h-[7rem] w-[7rem] rounded-full overflow-hidden border-[5px] translate-y-[3rem]">
            <img src={user?.imageURL || "/images/sampleimg.jpg"} />
          </div>
          {/* <span className="absolute h-full w-full top-0 left-0 rounded-[1rem] border-[#A1A1A1] bg-[#a1a1a186] z-[-9] blur-sm" style={{background: `${generateGrad().outputCode}`}}></span> */}
          <span className="absolute h-full w-full top-0 left-0 rounded-[1rem] border-[#A1A1A1] bg-black z-[-9] blur-sm opacity-25"></span>
          <div className="absolute h-[8rem] w-[8rem] rounded-full overflow-hidden border-b-[2px] translate-y-[3.5rem]"></div>
        </div>
        <div className="profile-data flex flex-col items-center">
          <h3 className="text-[3rem] text-[white]">
            {user?.fullName ? user?.fullName!.toUpperCase() : <Loading />}
          </h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>

          <ContactCard userId={user.userId}/>
          <ImageCarousel userId={user.userId}/>
        </div>
      </div>
      <div className="links flex flex-wrap gap-[2rem] justify-center w-[80%] py-[2rem]">
        {linkElements || ""}
      </div>
      {/* <div className='absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25' style={{background: `${generateGrad().outputCode}`}}></div> */}
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25 bg-black"></div>
      <AddLink />
    </div>
  ) : (
    <Loading/>
  );
};

export default Links;
