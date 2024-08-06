import { EditIcon } from "@/assets";
import {
  uploadBannerAndSaveURL,
} from "@/supabase/supabase";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";

const AddBanner = (props: {userId: string | any}) => {
  const [isUploadOpen, setIsUploadOpen] = useState<boolean | any>(false);
  const [imageFile, setImageFile] = useState<File | any>();
  const handleUploadOpen = () => setIsUploadOpen(!isUploadOpen);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await uploadBannerAndSaveURL(imageFile, props.userId);
    if (response) {
      setIsUploadOpen(false);
    }
  };
  return (
    <div>
      <IconButton onClick={handleUploadOpen} variant="gradient">
        <img src={EditIcon} alt="" />
      </IconButton>
      <Dialog open={isUploadOpen} size="xs" handler={setIsUploadOpen}>
        <form action="" onSubmit={handleSubmit}>
          <DialogBody>
            <div className="max-w-2xl mx-auto">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex gap-[1rem]">
            <Button type="submit">Upload</Button>
            <Button color="red" variant="outlined" onClick={handleUploadOpen}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default AddBanner;
