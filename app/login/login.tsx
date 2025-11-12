import user_icon from "./public/image/user_icon.png";
import password_icon from "./public/image/password_icon.png";
import show_password_active from "./public/image/show_password_active.png";

export function Login() {
  return (
    <div className="login-container flex flex-col p-12">
      <h1>Welcome! Please enter your details.</h1>
      <form className="login-form">
        <div className="userid-section flex flex-row border rounded-2xl bg-white m-4 p-2 gap-4">
          <img src={user_icon} className="h-8"></img>
          <input type="text" className="placeholder:text-gray-400" placeholder="Enter your user ID"></input>
        </div>
        <div className="password-section flex flex-row border rounded-2xl bg-white m-4 p-2 gap-4">
          <img src={password_icon} className="h-8"></img>
          <input type="password" className="placeholder:text-gray-400" placeholder="Enter your password"></input>
          <div className="show-password-button ml-auto mr-4">
            <img src={show_password_active} className="h-6"></img>
          </div>
        </div>
        <div className="under_username_container flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <input type="checkbox"></input>
            <label>Remember me</label>
          </div>
          <div className="ml-auto mr-4">
            <a>Forgot Password?</a>
          </div>
        </div>
        <div className="recaptcha">Recaptcha</div>
      </form>
      <div className="flex items-center justify-center">
      <button type="submit" className="login-button border rounded-md p-4 w-36">Log in</button>
      </div>
    </div>
  );  
}

