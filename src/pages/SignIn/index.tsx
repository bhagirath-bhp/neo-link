import { SignIn } from "@clerk/clerk-react"

const SignInPage = () => {
  const signUpURL = import.meta.env.VITE_APP_SIGNUP_URL;
  const redirectURL = import.meta.env.VITE_APP_LINKSPAGE_URL;
  return (
    <div className="h-full w-full flex justify-center items-center my-[2rem]">
        <SignIn signUpUrl={signUpURL} redirectUrl={redirectURL}/>
    </div>
  )
}

export default SignInPage