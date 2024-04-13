import { useState } from "react";
import {
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { sendContact, sendLink } from "@/supabase/supabase";
import { EditIcon } from "@/assets";

export function AddLink(props: { userId: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactData, setContactData] = useState<any>({
    title: "",
     value: "",
    logoURL: "",
  });

  const [linkData, setLinkData] = useState<any>({
    title: "",
    handleURL: "",
    logoURL: "",
  });

  const [type, setType] = useState("contact");

  const handleOpen = () => setOpen(!open);

  const handleContactChange = (e: any) => {
    const { name, value } = e.target;
    setContactData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLinkChange = (e: any) => {
    const { name, value } = e.target;
    setLinkData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = type === "contact" ? contactData : linkData;
    type === "contact"
      ? await sendContact(data, props.userId)
      : await sendLink(data, props.userId);
    setOpen(false);
    setLoading(false);
    // window.location.replace("/links");
  };

  return (
    <div className="absolute bottom-[1rem] right-[6rem]">
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="flex justify-center items-center p-[1rem]"
      >
        <img src={EditIcon} className="h-4" />
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Link</DialogHeader>
        <DialogBody className="flex justify-center items-center">
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="contact" onClick={() => setType("contact")}>
                Add Contact
              </Tab>
              <Tab value="link" onClick={() => setType("link")}>
                Add Link
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible noscrollbar"
              animate={{
                initial: {
                  x: type === "contact" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "contact" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="contact" className="p-0">
                <form
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-1 flex flex-col gap-6">
                    {/* <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Title
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter title"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-[80%]"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="title"
                      value={contactData.title}
                      onChange={handleContactChange}
                    /> */}
                    <Select
                      label="Select Contact"
                      name="title"
                      value={contactData.title}
                      onChange={(value: any) => {
                        setContactData((prevData: any) => ({
                          ...prevData,
                          title: value,
                        }));
                      }}
                    >
                      <Option value="phone">Phone</Option>
                      <Option value="website">Website</Option>
                      <Option value="mail">Email</Option>
                      {/* <Option value="">Phone</Option> */}
                    </Select>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Contact
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter handle URL"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="value"
                      value={contactData.value}
                      onChange={handleContactChange}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Logo URL
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter logo URL"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="logoURL"
                      value={contactData.logoURL}
                      onChange={handleContactChange}
                    />
                  </div>
                  <Button
                    className="mt-6"
                    fullWidth
                    type="submit"
                    loading={loading}
                  >
                    Add Link
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value="link" className="p-0">
                <form
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-1 flex flex-col gap-6">
                    {/* <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Title
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter title"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="title"
                      value={linkData.title}
                      onChange={handleLinkChange}
                    /> */}
                    <Select
                      label="Select Link"
                      name="title"
                      value={contactData.title}
                      onChange={(value: any) => {
                        setLinkData((prevData: any) => ({
                          ...prevData,
                          title: value,
                        }));
                      }}
                    >
                      <Option value="instagram">Instagram</Option>
                      <Option value="whatsapp">Whatsapp</Option>
                      <Option value="linkedin">Linked In</Option>
                      <Option value="facebook">Facebook</Option>
                      {/* <Option value="">Phone</Option> */}
                    </Select>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Handle URL
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter handle URL"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="handleURL"
                      value={linkData.handleURL}
                      onChange={handleLinkChange}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Logo URL
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter logo URL"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="logoURL"
                      value={linkData.logoURL}
                      onChange={handleLinkChange}
                    />
                  </div>
                  <Button
                    className="mt-6"
                    fullWidth
                    type="submit"
                    loading={loading}
                  >
                    Add Link
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
