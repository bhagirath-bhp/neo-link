import LinkItem from "../../components/LinkItem";
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
  ];
  const linkElements = links.map((item) => (
    <LinkItem
      key={item.id}
      title={item.title}
      url={item.url}
      type={item.type}
      imageURL={item.imageURL}
    />
  ));
  return (
    <div className="links-wrapper flex flex-col justify-center items-center">
      <div className="profile flex flex-col items-center justify-center relative">
        <div className="head h-[30vh] w-[90vw] relative top-[-10rem] flex justify-center rounded-[1rem]" style={{background: `url("/images/banner.1.png")`, backgroundSize: "cover"}}>
          <div className="profile-img h-[7rem] w-[7rem] rounded-full overflow-hidden border-[5px] absolute top-[75%]">
            <img src="/images/sampleimg.jpg" />
          </div>
        </div>
        <div className="profile-data">
          <h3>My Name</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>
        </div>
      </div>
      <div className="links">
        {linkElements}
      </div>
      <div className='absolute top-0 left-0 h-[100vh] w-[100vw] z-[-999] opacity-25' style={{background: `${generateGrad().outputCode}`}}></div>
    </div>
  );
};

export default Links;
