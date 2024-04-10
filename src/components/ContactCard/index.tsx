import { DeleteBlackIcon, ExLinkBlackIcon, TrashIcon } from "@/assets";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { deleteContact, listContacts } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { handleIcons } from "@/utils/utils";

const ContactCard = (props: {
  userId: string | undefined;
  isSignedIn: boolean | undefined;
}) => {
  const [contacts, setContacts] = useState<{id: string, value: string, user_id: string}[]>();
  useEffect(() => {
    const fetchContacts = async () => {
      const response: {id: string, value: string, user_id: string}[] | any = await listContacts(props.userId);
      if (response) {
        setContacts(response);
      }
    };
    fetchContacts();
  }, [contacts]);

  const handleDelete = async (contactId: string, userId: string) => {
    await deleteContact(contactId, userId);
    const temp: {id: string, value: string, user_id: string}[] | any = Array.isArray(contacts) && contacts.filter((item) => {
      item.id != contactId;
    });
    setContacts(temp);
  };

  const listItemSet =
    Array.isArray(contacts) &&
    contacts.map((contact: {id: string, value: string, user_id: string}, index: string) => {
      const iconURL: string = handleIcons[`${contact.title.toLowerCase()}`];
      return (
        <div key={index}>
          <ListItem
            ripple={false}
            className="py-1 px-2 bg-primary-color-1 hover:bg-primary-color-1"
          >
            <div className="w-full flex gap-[0.5rem] flex-1">
              <IconButton
                className="bg-primary-color-2 p-[0.5rem] rounded-sm"
                ripple={false}
                color="white"
              >
                <img src={iconURL} className="h-5" />
                {/* {contact.title} */}
              </IconButton>
              <div className="bg-primary-color-2 p-[0.5rem] rounded-sm w-full flex justify-between items-center">
                <span>{contact.value}</span>
                <img src={ExLinkBlackIcon} className="h-5" />
              </div>
              {props.isSignedIn && (
                <ListItemSuffix className="bg-primary-color-2 rounded-sm">
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => {
                      handleDelete(contact.id, contact.user_id);
                    }}
                  >
                    <img src={DeleteBlackIcon} />
                  </IconButton>
                </ListItemSuffix>
              )}
            </div>
          </ListItem>
          <div className="-inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
        </div>
      );
    });

  return (
    <Card className="min-w-[60%] max-w-[80%] bg-primary-color-1">
      <List>{Array.isArray(contacts) ? listItemSet : <Loading />}</List>
    </Card>
  );
};

export default ContactCard;
