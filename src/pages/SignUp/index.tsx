import { SignUp } from "@clerk/clerk-react"



const SignUpPage = () => {
  const signInUrl = import.meta.env.VITE_APP_SIGNIN_URL;
  const redirectURL = import.meta.env.VITE_APP_BASE_URL ;
  

  return (
    <div className="h-full w-full flex justify-center py-[3rem]">
        <SignUp signInUrl={signInUrl} afterSignUpUrl={redirectURL}/>
    </div>
  )
}

export default SignUpPage