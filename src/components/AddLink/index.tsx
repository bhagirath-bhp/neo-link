import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { sendLink } from "@/supabase/supabase";

export function AddLink() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkData, setLinkData] = useState({
    title: "",
    handleURL: "",
    logoURL: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await sendLink(linkData);
    console.log(response);
    setOpen(false);
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Link
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Link</DialogHeader>
        <DialogBody className="flex justify-center items-center">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                onChange={handleChange}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                onChange={handleChange}
              />
            </div>
            <Button className="mt-6" fullWidth type="submit" loading={loading}>
              Add Link
            </Button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
