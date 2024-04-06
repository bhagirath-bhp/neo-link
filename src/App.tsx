import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Links from "./pages/Links";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { auth } from "./firebase/utils";
import { signInWithCustomToken } from "firebase/auth";
import Cookies from "js-cookie";

function App() {
  const { getToken } = useAuth();
  useEffect(() => {
    const signInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      const userCredentials = await signInWithCustomToken(auth, token);
    };
    const fetchUserDetails = async () => {
      const userData = await window.Clerk?.user;
      if (userData) {
        const temp = {
          fullName: userData.fullName,
          imageURL: userData.imageUrl,
          userId: userData.id,
        };
        Cookies.set("userId", temp.userId);
      }
    };
    fetchUserDetails();
    signInWithClerk();
  }, []);

  return (
    <div className="overflow-x-hidden h-full overflow-y-scroll noscrollbar bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/links" element={<Links />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
