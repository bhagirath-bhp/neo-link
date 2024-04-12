import Loading from "@/components/Loading";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  List,
  ListItem,
  Card,
  ListItemSuffix,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  DialogHeader,
} from "@material-tailwind/react";
import { CopyIcon, DoneIcon, ExLinkBlackIcon, QRIcon, ShareIcon } from "@/assets";
import QRCode from "react-qr-code";

const Home = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setLink(
      import.meta.env.VITE_APP_LINKSPAGE_URL + "/" + user?.user?.username
    );
  }, [user.isLoaded]);

  if (user.isLoaded && !user.isSignedIn) {
    setInterval(() => {
      setCountdown(countdown - 1);
      if (countdown <= 1) {
        navigate("/signup");
      }
    }, 1000);
  }

  const handleCopy = async () => {
    if (link) {
      console.log("copying");
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
      } catch (error) {
        console.error("Failed to copy text to clipboard:", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="absolute top-[1rem] right-[1rem]">
        <UserButton />
      </div>
      {user.isLoaded && user.isSignedIn ? (
        <div>
          <Card className="w-96">
            <h1 className="text-2xl border-b-2 py-3 font-bold">My Neolink</h1>
            <List>
              <ListItem ripple={false} className="shadow-md">
                <p>
                  {import.meta.env.VITE_APP_LINKSPAGE_URL +
                    "/" +
                    user?.user.username}
                </p>
                <ListItemSuffix onClick={handleCopy}>
                  <Button color="white">
                    <img
                      src={copied ? DoneIcon : CopyIcon}
                      alt="qr"
                      className="h-5"
                    />
                  </Button>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="shadow-md">
                <p>Generate QR</p>
                <ListItemSuffix
                  onClick={() => {
                    setIsQrOpen(true);
                  }}
                >
                  <Button color="white">
                    <img src={QRIcon} alt="qr" className="h-5" />
                  </Button>
                </ListItemSuffix>
                <Dialog open={isQrOpen} size="sm">
                  <DialogHeader>My NeoCode</DialogHeader>
                  <DialogBody className="flex justify-center">
                    <QRCode value={link ? link : ""} />
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setIsQrOpen(false);
                      }}
                      variant="outlined"
                      color="red"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </Dialog>
              </ListItem>
              <ListItem ripple={false} className="shadow-md">
                <p>Share</p>
                <Dialog open={isShareOpen} size="xs">
                      <DialogBody>
                        <div className="flex justify-center gap-[2rem]">
                          <FacebookShareButton url={link} className="rounded-sm overflow-hidden">
                            <FacebookIcon size={40}/>
                          </FacebookShareButton>
                          <WhatsappShareButton url={link} className="rounded-sm overflow-hidden">
                            <WhatsappIcon size={40}/>
                          </WhatsappShareButton>
                          <EmailShareButton url={link} className="rounded-sm overflow-hidden">
                            <EmailIcon size={40}/>
                          </EmailShareButton>
                          <LinkedinShareButton url={link} className="rounded-sm overflow-hidden">
                            <LinkedinIcon size={40}/>
                          </LinkedinShareButton>
                          <TelegramShareButton url={link} className="rounded-sm overflow-hidden">
                            <TelegramIcon size={40}/>
                          </TelegramShareButton>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button variant="outlined" color="red" onClick={()=>{setIsShareOpen(false)}}>
                          Cancel
                        </Button>
                      </DialogFooter>
                </Dialog>
                <ListItemSuffix onClick={()=>{setIsShareOpen(true)}}>
                  <Button color="white">
                    <img src={ShareIcon} alt="share" className="h-5" />
                  </Button>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="shadow-md">
                <p>Visit</p>
                <ListItemSuffix>
                  <Button color="white" onClick={()=>{navigate(`/links/${user.user.username}`)}}>
                    <img src={ExLinkBlackIcon} alt="" className="h-5" />
                  </Button>
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>
        </div>
      ) : user.isLoaded && !user.isSignedIn ? (
        <p className="text-4xl text-blue-gray-800">
          {" "}
          Redirecting in {countdown}
        </p>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
