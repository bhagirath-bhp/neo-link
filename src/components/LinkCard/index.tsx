import { DeleteWhiteIcon } from "@/assets";
import { deleteLink } from "@/supabase/supabase";
import { handleIcons } from "@/utils/utils";

const LinkCard = (props: {
  title: string;
  handleURL: string;
  linkId: string;
  userId: string | undefined;
  isSignedIn: boolean | undefined;
}) => {
  const iconURL: string = handleIcons[`${props.title.toLowerCase()}`];

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await deleteLink(props.linkId, props.userId);
    console.log(response);
  };
  return (
    <a href={props.handleURL} className="cursor-pointer" target="_blank">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div> */}
          <div className="absolute -inset-1 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative min-w-[10rem] shadow-md py-[1rem] bg-primary-color-1  rounded-md flex items-center justify-evenly">
            <img src={iconURL} className="fill-primary-color-3 h-5" alt="" />
            <div className="space-y-2">
              <h3 className="text-slate-800 text-primary-color-3">{props.title}</h3>
            </div>
            {props.isSignedIn && (
              <div onClick={handleDelete}>
                <img src={DeleteWhiteIcon} className="h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
