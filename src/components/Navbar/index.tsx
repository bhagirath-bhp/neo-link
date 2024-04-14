import { UserButton } from "@clerk/clerk-react"
import ThemeColorProvider from "../ThemeColorProvider";

const Navbar = (props: {isSignedIn: boolean | undefined}) => {
  const signInUrl = import.meta.env.VITE_APP_SIGNIN_URL;
  return (
    <div className="flex justify-between w-full gap-[1rem] p-[1rem] text-white">
      <div className="logo bg-black px-[1rem] rounded-md py-[5px]">
        <a href="/" className="font-bold text-2xl border-b-[1px] border-white">NEOLINK</a>
        <div className="flex items-center justify-end gap-[0.5rem] text-[8px]">
          <p>powered by</p>
          <img src="/images/impeto.tech.white.png" alt="impeto" className="h-[0.5rem]"/>
        </div>
      </div>
      <div className="flex">
        {props.isSignedIn && (<div>
          <ThemeColorProvider/>
        </div>)}
        {/* <div className="absolute z-[100] top-3 right-3"> */}
        <div className="">
          <UserButton afterSignOutUrl={signInUrl} />
        </div>
      </div>
      {/* <UserProfile/> */}
    </div>
  )
}

export default Navbar