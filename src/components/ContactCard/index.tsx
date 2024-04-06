import { TrashIcon } from "@/assets";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { listContacts } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { handleIcons } from "@/utils/utils";

const ContactCard = (props: { userId: string }) => {
  const [contacts, setContacts] = useState();
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await listContacts(props.userId);
      if (response) {
        setContacts(response);
      }
    };
    fetchContacts();
  }, []);

  const listItemSet =
    Array.isArray(contacts) &&
    contacts.map((contact, index) => {
      const iconURL: string = handleIcons[`${contact.title.toLowerCase()}`];
      return (
        <div key={index}>
          <ListItem ripple={false} className="py-1 px-2 bg-black">
            <div className="w-full flex gap-[0.5rem] flex-1">
              <div className=" bg-blue-gray-50 p-[0.5rem] rounded-sm w-fit">
                <img src={iconURL} className="h-5" />
                {/* {contact.title} */}
              </div>
              <div className="bg-blue-gray-50 p-[0.5rem] rounded-sm w-full">
                {contact.value}
              </div>
              {/* <ListItemSuffix className="bg-blue-gray-50 rounded-sm">
                <IconButton variant="text" color="blue-gray">
                  <img src={TrashIcon} />
                </IconButton>
              </ListItemSuffix> */}
            </div>
          </ListItem>
          <div className="-inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
        </div>
      );
    });

  return (
    <Card className="w-96 bg-black">
      <List>{Array.isArray(contacts) ? listItemSet : <Loading />}</List>
    </Card>
  );
};

export default ContactCard;
