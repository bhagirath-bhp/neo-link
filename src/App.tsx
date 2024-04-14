import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Links from "./pages/Links";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <div className="overflow-x-hidden h-full overflow-y-scroll noscrollbar bg-blue-gray-300 text-blue-gray-300">
      <HashRouter>
        <Routes>
          {/* <Route path="/" element={<p className="text-white">hii</p>}></Route> */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/links/:username" element={<Links />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
