import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { useState } from "react";
import base_logo from "../../public/image/base_logo@2.png"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Validasi username: minimal 3 karakter
  const isUsernameValid = username.length >= 3;

  // Validasi password: minimal 8 karakter
  const isPasswordValid = password.length >= 8;

  return (
    <div className="login-container flex flex-col m-16 p-12 rounded-2xl"  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
      <img src={base_logo} className="w-48"></img>
      <h1 className="">Welcome! Please enter your details.</h1>
      <form className="login-form">
        <div className="userid-section flex flex-row m-4 p-2 gap-4">
            <Input
              variant="text"
              label="Username"
              placeholder="Enter your username"
              error="Username is required"
              isValid={isUsernameValid}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            }/>
        </div>
        <div className="password-section flex flex-row m-4 p-2 gap-4">
          <Input
            variant="password"
            label="Password"
            placeholder="Enter your password"
            error="Password must be at least 8 characters"
            isValid={isPasswordValid}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>
        <div className="under_username_container flex flex-row m-4 p-2 gap-4">
          <label className="flex flex-row gap-2">
            <input type="checkbox" style={{zoom: 1.5}}></input>
            Remember me
          </label>
          <div className="ml-auto mr-4">
            <a>Forgot Password?</a>
          </div>
        </div>
        <div className="recaptcha m-4 p-2">Recaptcha</div>
        <div className="flex items-center justify-center">
                <Button variant="primary" size="lg">
                Log In
                </Button>
        </div>
      </form>
    </div>
  );  
}

