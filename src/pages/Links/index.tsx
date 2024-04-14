import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Loading from "@/components/Loading";
import { getUserData, getUserIdWithUserName, listLinks } from "@/supabase/supabase";
import { AddLink } from "@/components/AddLink";
import { Banner1 } from "@/assets";
import Navbar from "@/components/Navbar";
import LinkCard from "@/components/LinkCard";
import ImageCarousel from "@/components/ImageCarousel";
import ContactCard from "@/components/ContactCard";
import { useUser } from "@clerk/clerk-react";
import AddBanner from "@/components/AddBanner";
import LoaderOne from "@/components/LoaderOne";


const Links = () => {
  const [links, setLinks] = useState<any>();
  const user = useUser();
  const [userData, setUserData] = useState<any>();
  const [userId, setUserId] = useState<string | any>("");
  const {username} = useParams();
  const bucketURL = import.meta.env.VITE_SUPABASE_BUCKET_URL;


  useEffect(()=>{
    setTimeout(()=>{
      const fetchUserId = async () => {
        const response = await getUserIdWithUserName(username);
        if(Array.isArray(response)){
          setUserId(response[0].user_id);
        }
      }
      fetchUserId();
    }, 1000)
  }, [])
  useEffect(() => {
    if(userId){
      const fetchLinks = async () => {
        const response = await listLinks(userId);
        setLinks(response);
      };
      const fetchUserData = async () => {
        const response: any = await getUserData(userId);
        console.log(response[0].bannerURL)
        setUserData(response);
        document.documentElement.style.setProperty("--primary-color-1", response[0]["primary-color-1"]);
        document.documentElement.style.setProperty("--primary-color-2", response[0]["primary-color-2"]);
        document.documentElement.style.setProperty("--primary-color-3", response[0]["primary-color-3"]);
      };
      fetchLinks();
      fetchUserData();
    }
  }, [userId]);



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
    <div className="links-wrapper flex flex-col items-center justify-evenly bg-primary-color-1 h-full w-full overflow-y-scroll fancyscrollbar-1">
      <Navbar isSignedIn={user.isSignedIn}/>
      <div className="profile flex flex-col justify-evenly gap-[5rem]">
        <div
          className="relative head h-[30vh] w-[95vw] flex justify-center items-end rounded-[1rem] border-[1px]"
          style={{
            background: `url("${(Array.isArray(userData)) ? (bucketURL + userData[0].bannerURL) || Banner1 : ""}") no-repeat center / cover`,
          }}
        >
          <div
            className="profile-img h-[7rem] w-[7rem] rounded-full overflow-hidden border-[5px] translate-y-[3rem]"
            style={{
              background: `url("${(Array.isArray(userData)) ? userData[0].profileURL : ""}") no-repeat center / cover`,
            }}
            
          >
          </div>
          <div className="absolute bottom-2 right-2">
            {(user.isLoaded && user.isSignedIn) && <AddBanner userId={userId}/>}
          </div>
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
      <div className="links flex flex-wrap gap-[2rem] justify-center w-[80%] py-[2rem] text-primary-color-3 shadow-xl mb-[2rem] rounded-lg">
        {linkElements}
      </div>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25 bg-primary-color-1"></div>
      {
        (user.isLoaded && user.isSignedIn) && <AddLink userId={userId}/>
      }
    </div>
  ) : (
    <div className="text-primary-color-3 flex justify-center items-center h-full">
      <LoaderOne />
    </div>
  );
};

export default Links;
