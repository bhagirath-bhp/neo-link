import { UserButton, UserProfile } from "@clerk/clerk-react"


const Navbar = () => {
  const signInUrl = import.meta.env.VITE_APP_SIGNIN_URL;
  return (
    <div className="flex justify-end w-full p-[1rem]">
      <div className="absolute z-[100]">
        <UserButton afterSignOutUrl={signInUrl}/>
      </div>
      {/* <UserProfile/> */}
    </div>
  )
}

export default Navbar