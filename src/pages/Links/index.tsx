import { Banner1 } from "../../assets";
import LinkCard from "../../components/LinkCard";
import LinkItem from "../../components/LinkItem";
import Navbar from "../../components/Navbar";
import { generateGrad } from "../../utils";

const Links = () => {
  const links = [
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
  // const linkElements = links.map((item) => (
  //   <LinkItem
  //     key={item.id}
  //     title={item.title}
  //     url={item.url}
  //     type={item.type}
  //     imageURL={item.imageURL}
  //   />
  // ));
  const linkElements = links.map((item) => (
    <LinkCard
      key={item.id}
      title={item.title}
      url={item.url}
      type={item.type}
      imageURL={item.imageURL}
    />
  ));
  return (
    <div className="links-wrapper flex flex-col justify-center items-center">
      <Navbar />
      <div className="profile flex flex-col justify-evenly gap-[5rem]">
        <div
          className="relative head h-[30vh] w-[95vw] flex justify-center items-end rounded-[1rem] border-[1px]"
          style={{ background: `url("${Banner1}")`, backgroundSize: "cover" }}
        >
          <div className="profile-img h-[7rem] w-[7rem] rounded-full overflow-hidden border-[5px] translate-y-[3rem]">
            <img src="/images/sampleimg.jpg" />
          </div>
          {/* <span className="absolute h-full w-full top-0 left-0 rounded-[1rem] border-[#A1A1A1] bg-[#a1a1a186] z-[-9] blur-sm" style={{background: `${generateGrad().outputCode}`}}></span> */}
          <span className="absolute h-full w-full top-0 left-0 rounded-[1rem] border-[#A1A1A1] bg-black z-[-9] blur-sm opacity-25"></span>
          <div className="absolute h-[8rem] w-[8rem] rounded-full overflow-hidden border-b-[2px] translate-y-[3.5rem]"></div>
        </div>
        <div className="profile-data">
          <h3 className="text-[3rem]">Impeto Technologies</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>
        </div>
      </div>
      <div className="links flex flex-wrap gap-[2rem] justify-center w-[50%] py-[2rem]">
        {linkElements}
      </div>
      {/* <div className='absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25' style={{background: `${generateGrad().outputCode}`}}></div> */}
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25 bg-black"></div>
    </div>
  );
};

export default Links;
