import { onCaptchaVerify } from './utils';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getStorage, ref } from "firebase/storage";
import toast from 'react-hot-toast';



const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = firebase.firestore();
export const currentUser = firebase.auth().currentUser;

export const onCaptchaVerify = (window: any, setLoading, phone) => {
  console.log("captcha verify starts")
  if (!window.recaptchaVerifier) {

    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      "size": "invisible",
      "callback": () => {
        console.log("captcha verify starts 2")
        toast('captcha verification starts 2', {
          duration: 1500,
          position: 'top-center',
          icon: '🚀',
        });
        onSignUp(setLoading, window, phone)
      },
      "expired-callback": (response) => {
        console.log("expired: ", response)
        toast.error('Oops! something went wrong', {
          duration: 1500,
          position: 'top-center',
          icon: '⚠️',
        });
      }, 
    }); 
  }
};

export const onSignUp = (setLoading, window, phone) => {
  console.log("on sign up starts")
  setLoading(true);
  onCaptchaVerify(window, setLoading, phone);

  const appVerifier = window.recaptchaVerifier
  // const formatedPhone = '+' + phone;
  const formatedPhone = phone;
  signInWithPhoneNumber(auth, formatedPhone, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast('captcha verification starts 2', {
        duration: 1500,
        position: 'top-center',
        icon: '🚀',
      });
      setLoading(false);
      // ...
    }).catch((error) => { 
      console.log("error", error);
      toast.error('Oops! something went wrong', {
        duration: 1500,
        position: 'top-center',
        icon: '⚠️',
      });
    });
}


export const onOtpVerify = async (otp, window, setLoading)  => {
  setLoading(true)
  const result = await window.confirmationResult.confirm(otp)
  console.log(result)
  if(result){
    setLoading(false);
  }
}
// export const onSignUp = async (setLoading, window, phone) => {
//   setLoading(true)
//   try {
//     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
//     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
//     console.log(confirmation);
//     setLoading(false);
//   } catch (error) {
//     console.log(error);
//   }
// }
