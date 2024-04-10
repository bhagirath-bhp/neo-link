import { UserButton } from "@clerk/clerk-react"
import ThemeColorProvider from "../ThemeColorProvider";

const Navbar = () => {
  const signInUrl = import.meta.env.VITE_APP_SIGNIN_URL;
  return (
    <div className="flex justify-end w-full gap-[1rem] p-[1rem]">
      <div>
        <ThemeColorProvider/>
      </div>
      {/* <div className="absolute z-[100] top-3 right-3"> */}
      <div className="">
        <UserButton afterSignOutUrl={signInUrl} />
      </div>
      {/* <UserProfile/> */}
    </div>
  )
}

export default Navbar