import { DeleteBlackIcon, ExLinkBlackIcon } from "@/assets";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { deleteContact, listContacts } from "@/supabase/supabase";
import { useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import {
  generateHandleURL,
  handleIcons,
  updateMaxChars,
  wrapTextWithEllipsis,
} from "@/utils/utils";

const ContactCard = (props: {
  userId: string | undefined;
  isSignedIn: boolean | undefined;
}) => {
  const [contacts, setContacts] =
    useState<{ id: string; title: string; value: string; user_id: string }[]>();
  const [maxChars, setMaxChars] = useState(25); // Default value
  const textContainerRef = useRef(null);
  useEffect(() => {
    const fetchContacts = async () => {
      const response:
        | { id: string; title: string; value: string; user_id: string }[]
        | any = await listContacts(props.userId);
      if (response) {
        setContacts(response);
      }
    };
    fetchContacts();
  }, []);
  useEffect(() => {
    // Initial calculation
    updateMaxChars(textContainerRef, setMaxChars);
    const handleResize = () => {
      updateMaxChars(textContainerRef, setMaxChars);
    };
    // Update maxChars on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (contactId: string, userId: string) => {
    await deleteContact(contactId, userId);
    const temp: { id: string; value: string; user_id: string }[] | any =
      Array.isArray(contacts) &&
      contacts.filter((item) => {
        item.id != contactId;
      });
    setContacts(temp);
  };

  const listItemSet =
    Array.isArray(contacts) && contacts.length > 0 ? (
      contacts.map(
        (
          contact: {
            id: string;
            title: string;
            value: string;
            user_id: string;
          },
          index: number
        ) => {
          const iconURL: any = handleIcons[`${contact.title.toLowerCase()}`];
          const contactURL: string = generateHandleURL(
            contact.value,
            contact.title
          );
          return (
            <div key={index}>
              <ListItem
                ripple={false}
                className="py-1 px-2 bg-primary-color-1 hover:bg-primary-color-1"
              >
                <div className="w-full flex gap-[0.5rem] flex-1">
                  <IconButton
                    className="bg-primary-color-2 p-[0.5rem] rounded-sm shadow-none hover:shadow-none"
                    ripple={false}
                    color="white"
                  >
                    {/* <img src={iconURL} className="h-5" /> */}
                    <div
                      className="bg-primary-color-3 h-5 w-5"
                      style={{
                        mask: `url(${iconURL}) center / contain no-repeat padding-box`,
                      }}
                    ></div>
                    {/* {contact.title} */}
                  </IconButton>
                  <a
                    href={contactURL}
                    target="_blank"
                    className="bg-primary-color-2 p-[0.5rem] rounded-sm w-full flex justify-between items-center text-primary-color-3"
                  >
                    <span>{wrapTextWithEllipsis(contact.value, 25)}</span>
                    <Button
                      children=""
                      ripple={false}
                      className="bg-primary-color-3 h-5 w-5"
                      style={{
                        mask: `url(${ExLinkBlackIcon}) center / contain no-repeat padding-box`,
                      }}
                    ></Button>
                  </a>
                  {props.isSignedIn && (
                    <ListItemSuffix className="bg-primary-color-2 rounded-sm">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => {
                          handleDelete(contact.id, contact.user_id);
                        }}
                      >
                        {/* <img src={DeleteBlackIcon} /> */}
                        <div
                          className="bg-primary-color-3 h-5 w-5"
                          style={{
                            mask: `url(${DeleteBlackIcon}) center / contain no-repeat padding-box`,
                          }}
                        ></div>
                      </IconButton>
                    </ListItemSuffix>
                  )}
                </div>
              </ListItem>
              <div className="-inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>
            </div>
          );
        }
      )
    ) : (
      <h1 className="text-[3rem] font-bold uppercase opacity-10 my-[1rem]">
        Contacts Land Here
      </h1>
    );

  return (
    <Card className="min-w-[60%] max-w-[80%] bg-primary-color-1 mb-[2rem]">
      <List>{Array.isArray(contacts) ? listItemSet : <Loading />}</List>
    </Card>
  );
};

export default ContactCard;
