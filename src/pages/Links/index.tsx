import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Loading from "@/components/Loading";
import { getUserData, listLinks } from "@/supabase/supabase";
import { AddLink } from "@/components/AddLink";
import { Banner1 } from "@/assets";
import Navbar from "@/components/Navbar";
import LinkCard from "@/components/LinkCard";
import ImageCarousel from "@/components/ImageCarousel";
import ContactCard from "@/components/ContactCard";
import { useUser } from "@clerk/clerk-react";


const Links = () => {
  const [links, setLinks] = useState<any>();
  const user = useUser();
  const [userData, setUserData] = useState<any>();
  const {userId } = useParams();



  useEffect(() => {
    const fetchLinks = async () => {
      const response = await listLinks(userId);
      setLinks(response);
    };
    const fetchUserData = async () => {
      const response: any = await getUserData(userId);
      setUserData(response);
      document.documentElement.style.setProperty("--primary-color-1", response[0]["primary-color-1"]);
      document.documentElement.style.setProperty("--primary-color-2", response[0]["primary-color-2"]);
      document.documentElement.style.setProperty("--primary-color-3", response[0]["primary-color-3"]);
    };
    fetchLinks();
    fetchUserData();
    setTimeout(()=>{

    }, 2000)
  }, []);



  const linkElements =
    Array.isArray(links) &&
    links?.map((item) => (
      <LinkCard
        key={item.id}
        linkId={item.id}
        title={item.title}
        handleURL={item.handleURL}
        userId={userId || (user.isLoaded ? user.user?.id : "")}
        isSignedIn={user.isSignedIn}
      />
    ));



  return (linkElements) ? (
    <div className="links-wrapper flex flex-col items-center justify-evenly bg-primary-color-1 h-full w-full">
      <Navbar isSignedIn={user.isSignedIn}/>
      <div className="profile flex flex-col justify-evenly gap-[5rem]">
        <div
          className="relative head h-[30vh] w-[95vw] flex justify-center items-end rounded-[1rem] border-[1px] bg-cover"
          style={{ background: `url("${Banner1}")` }}
        >
          <div
            className="profile-img h-[7rem] w-[7rem] rounded-full overflow-hidden border-[5px] translate-y-[3rem]"
            style={{
              // background: `url("${user?.isLoaded && user.user?.imageUrl || ""}") no-repeat center`,
              background: `url("${(Array.isArray(userData)) ? userData[0].profileURL : ""}") no-repeat center / cover`,
            }}
            
          >
          </div>
          <span className="absolute h-full w-full top-0 left-0 rounded-[1rem] border-primary-color-2 bg-primary-color-1 z-[-9] blur-sm opacity-25"></span>
          <div className="absolute h-[8rem] w-[8rem] rounded-full overflow-hidden border-b-[2px] translate-y-[3.5rem]"></div>
        </div>
        <div className="profile-data flex flex-col items-center">
          <h3 className="text-[3rem] text-primary-color-3">
            {/* {user.isLoaded ? user.user?.fullName!.toUpperCase() : <Loading />} */}
            {(Array.isArray(userData)) ? userData[0].fullName.toUpperCase() : <Loading />}
          </h3>
          <ImageCarousel userId={userId} />
          <ContactCard userId={userId} isSignedIn={user.isSignedIn}/>
        </div>
      </div>
      <div className="links flex flex-wrap gap-[2rem] justify-center w-[80%] py-[2rem] text-primary-color-3">
        {linkElements}
      </div>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25 bg-primary-color-1"></div>
      {
        (user.isLoaded && user.isSignedIn) && <AddLink userId={userId}/>
      }
    </div>
  ) : (
    <div className="text-primary-color-3">
      <Loading />
    </div>
  );
};

export default Links;
