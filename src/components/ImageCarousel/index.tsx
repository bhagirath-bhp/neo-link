import {
  Button,
  Carousel,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  listImageURLs,
  uploadImageAndSaveURL,
} from "@/supabase/supabase";
import { GalleryWhitePNG } from "@/assets";
import { useUser } from "@clerk/clerk-react";
// import { DeleteWhiteIcon } from "@/assets";


const ImageCarousel = (props: any) => {
  const [open, setOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageURLs, setImageURLs] = useState<any>([]);
  const { isSignedIn } = useUser();
  const userId = props.userId;
  useEffect(() => {
    const fetchImages = async () => {
      const response = await listImageURLs(userId);
      setImageURLs(response);
    };
    fetchImages();
  }, []);

  const handleOpen = () => setOpen(!open);
  const handleUploadOpen = () => setIsUploadOpen(!isUploadOpen);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await uploadImageAndSaveURL(imageFile, userId);
    if (response) {
      setIsUploadOpen(false);
    }
  };
  // const handleDelete = async (imageId: string, imageURL: string, userId: string) => {
  //   e.preventDefault();
  //   const response = await deleteImage(imageId, imageURL, userId);
  //   console.log(response)
  // }
  //   const imgURLs = [...props.urls] ;
  //   const imgURLs = [
  //     "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  //     "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  //     "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  //   ];
  // const imageComponentSet = imgURLs.map((img)=>(<img src={img.url} key={img.key} alt="image 1" className="h-full w-full object-cover"/>
  const imageComponentSet =
    Array.isArray(imageURLs) &&
    imageURLs?.map((img, index) => (
      <div key={index} className="relative">
        <img
          src={img}
          alt="image 1"
          className="h-full w-full max-h-[25rem] object-cover"
        />
        {/* <IconButton className="absolute top-2 right-2">
        <img src={DeleteWhiteIcon} alt="" />
      </IconButton> */}
      </div>
    ));
  return (
    <div className="absolute z-[99] bottom-[1rem] right-[1rem]">
      {/* <Button onClick={handleOpen}>View Images</Button> */}
      <Button
        onClick={handleOpen}
        className="py-[1rem] px-[1rem]"
        variant="gradient"
      >
        <img src={GalleryWhitePNG} className="h-4" />
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Images</DialogHeader>
        <DialogBody>
          {imageURLs && (
            <Carousel
              className="rounded-xl max-h-[25rem]"
              prevArrow={({ handlePrev }: any) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }: any) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
            >
              {imageComponentSet}
            </Carousel>
          )}
        </DialogBody>
        <DialogFooter>
          <Dialog open={isUploadOpen} size="xs">
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
                <Button
                  color="red"
                  variant="outlined"
                  onClick={handleUploadOpen}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
          <div className="flex gap-[1rem]">
            { isSignedIn && <Button onClick={handleUploadOpen}>Add Images</Button> }
            <Button onClick={handleOpen} color="red" variant="outlined">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ImageCarousel;
