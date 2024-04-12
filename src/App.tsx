import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Links from "./pages/Links";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";


function App() {
  return (
    <div className="overflow-x-hidden h-full overflow-y-scroll noscrollbar bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p className="text-white">hii</p>}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/links/:username" element={<Links />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
