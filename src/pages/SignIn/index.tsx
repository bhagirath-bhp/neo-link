import "./styles.css";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="content">
        <h2 className="font-bold text-[3rem]">Sign In</h2>

        <div className="form flex place-content-center flex-col gap-[1rem] my-[2rem]">
          <div className="inputBox">
            {/* <i>Username</i> */}
            <input type="text" placeholder="username" required />
          </div>

          <div className="inputBox">
            {/* <i>Password</i> */}
            <input type="password" placeholder="password" required />
          </div>

          <div className="inputBox flex justify-center bg-[#0f0]">
            <input type="submit" value="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
