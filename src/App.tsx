import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Links from "./pages/Links";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { auth } from "./firebase/utils";
import { signInWithCustomToken } from "firebase/auth";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      const userCredentials = await signInWithCustomToken(auth, token);

    };
    signInWithClerk();
  }, []);

  return (
    <div className="overflow-x-hidden h-full overflow-y-scroll noscrollbar">
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
