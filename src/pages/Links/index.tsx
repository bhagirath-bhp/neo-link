import { useEffect, useState } from "react";
import { Banner1 } from "../../assets";
import LinkCard from "../../components/LinkCard";
import Navbar from "../../components/Navbar";
import { generateGrad } from "../../utils";
import Loading from "@/components/Loading";
import { listLinks } from "@/supabase/supabase";
import { AddLink } from "@/components/AddLink";

const Links = () => {
  const [user, setUser] = useState<{
    fullName: string;
    imageURL: string;
    userId?: string;
  }>({ fullName: "", imageURL: "", userId: "" });
  const [links, setLinks] = useState([]); // Link data (modify if needed)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await window.Clerk?.user;
      if (userData) {
        const temp = {
          fullName: userData.fullName,
          imageURL: userData.imageUrl,
          userId: userData.id,
        };
        setUser(temp);
      }
    };
    const fetchLinks = async () => {
      const response = await listLinks();
      setLinks(response);
      console.log(response);
    };

    fetchUserDetails();
    fetchLinks();
  }, []);

  const mylinks = [
    {
      id: 1,
      url: "www.google.com",
      title: "Google",
      type: "Social",
      imageURL: "/images/colourfull.jpg",
    },
    {
      id: 2,
      url: "www.google.com",
      title: "Google",
      type: "Social",
      imageURL: "/images/colourfull.jpg",
    },
    {
      id: 3,
      url: "www.google.com",
      title: "Google",
      type: "Social",
      imageURL: "/images/colourfull.jpg",
    },
  ];
  const linkElements = links?.map((item) => (
    <LinkCard
      key={item.id}
      title={item.title}
      url={item.url}
      type={item.type}
      imageURL={item.imageURL}
    />
  ));
  return (
    <div className="links-wrapper flex flex-col justify-center items-center bg-black h-screen overflow-y-scroll noscrollbar">
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
        <div className="profile-data">
          <h3 className="text-[3rem] text-[white]">
            {user?.fullName ? user?.fullName!.toUpperCase() : <Loading />}
          </h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>
        </div>
      </div>
      <AddLink />
      <div className="links flex flex-wrap gap-[2rem] justify-center w-[50%] py-[2rem]">
        {linkElements || ""}
      </div>
      {/* <div className='absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25' style={{background: `${generateGrad().outputCode}`}}></div> */}
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25 bg-black"></div>
    </div>
  );
};

export default Links;
