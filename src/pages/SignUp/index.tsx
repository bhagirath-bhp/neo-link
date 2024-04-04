import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { onOtpVerify, onSignUp } from "../../firebase/utils";
import { Toaster } from "react-hot-toast";
import PasswordChecklist from "react-password-checklist";

// import { onCaptchaVerify } from "../../firebase/utils";

// import PhoneInput from "react-phone-number-input/input";
// import "./styles.css";

const SignUp = () => {
  const [phone, setPhone] = useState<string>("+916352099548");
  const [otp, setOtp] = useState<string>();
  const [loading, setLoading] = useState<string>();
  const [isValidateActive, setIsValidateActive] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  // useEffect()
  return (
    <div className="bg-black text-white flex min-h-screen w-screen flex-col items-center py-[1rem]">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Impeto Technologies
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border-[1px] rounded-[1rem]">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Sign Up
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form className="flex flex-col gap-[1rem]">
              <div className="relative rounded-lg border-[1px] bordeer-[#A1A1A1] p-[0.5rem]">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Company Name
                  </label>
                  <div className="absolute right-3 translate-y-2 text-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="companyname"
                  // placeholder="Company Name"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
              </div>
              <div
                className={`relative rounded-lg border-[1px] border-[#A1A1A1] p-[0.5rem] overflow-hidden transition-all duration-300 ${
                  isValidateActive ? "max-h-[12rem]" : "max-h-[6rem]"
                }`}
              >
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Phone Number
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <PhoneInput
                    country="in"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                    }}
                    containerClass="bg-[transparent] text-[white] flex gap-[1rem] my-[0.5rem]"
                    inputStyle={{
                      background: "transparent",
                      border: "1px solid #999",
                    }}
                    dropdownStyle={{ background: "#222" }}
                    buttonStyle={{ background: "#111" }}
                    searchClass="hover:text-[#111] border-[10px] border-[black]"
                  />
                  <Button
                    loading={loading}
                    className="bg-[green] rounded-md py-[0.5rem] px-[1rem] my-[1rem]"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsValidateActive(isValidateActive ? false : true);
                      onSignUp(setLoading, window, phone);
                      // onCaptchaVerify(window, setLoading, phone);
                      // console.log(first)
                    }}
                    id="sign-in-button"
                  >
                    Validate
                  </Button>
                </div>
                <div id="recaptcha"></div>
                {/* <div className="border-[1px] border-[#A1A1A1] rounded-lg p-[1rem]"> */}
                <div className="my-[1rem]">
                  <OtpInput
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      if (value.length === 6) {
                        console.log(value);
                        onOtpVerify(otp, window, setLoading);
                      }
                    }}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="rounded-md text-[white] min-h-[2.5rem] min-w-[2.5rem]"
                      />
                    )}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      padding: "0 0.2rem",
                    }}
                  />
                </div>
              </div>
              <div className="">
                <div>
                  <div className="group relative rounded-lg border-[1px] border-[#A1A1A1] p-[0.5rem]">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        className="block w-full border-0 border-b-[1px] mb-[1rem] bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        ReEnter Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        value={passwordAgain}
                        onChange={(e)=>{setPasswordAgain(e.target.value)}}
                        className="block w-full border-0 border-b-[1px] mb-[1rem] bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                    <PasswordChecklist
                      rules={[
                        "minLength",
                        // "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={5}
                      value={password}
                      valueAgain={passwordAgain}
                      onChange={(isValid) => {}}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="outline-none focus:outline focus:outline-sky-300"
                  />
                  <span className="text-xs">Remember me</span>
                </label>
                <a
                  className="text-sm font-medium text-foreground underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </div> */}
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <Button
                  variant="outlined"
                  color="white"
                  onClick={() => {
                    navigate("/signin");
                  }}
                  placeholder=""
                >
                  Sign In
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    onCaptchaVerify(window, setLoading, phone);
                    // navigate("/signin");
                  }}
                  variant="filled"
                  color="white"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
