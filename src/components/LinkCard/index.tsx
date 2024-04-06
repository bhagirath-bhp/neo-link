import { handleIcons } from "@/utils/utils";


const LinkCard = (props: {title: string}) => {
  const iconURL: string = handleIcons[`${props.title.toLowerCase()}`];
  return (
    <div className="cursor-pointer">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative min-w-[10rem] py-[1rem] bg-black ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-evenly">
            {/* <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
              ></path>
            </svg> */}
            <img src={iconURL} className="fill-white h-5" alt="" />
            <div className="space-y-2">
              <h3 className="text-slate-800 text-white">
                {props.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
