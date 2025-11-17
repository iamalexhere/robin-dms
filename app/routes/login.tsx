import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { useState } from "react";
import base_logo from "../../public/image/base_logo@2.png";
import usersData from "~/data/users.json";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states untuk masing-masing field
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Fungsi untuk handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setUsernameError('');
    setPasswordError('');
    setIsLoading(true);

    // Simulasi delay untuk loading
    setTimeout(() => {
      // Cari user di data JSON
      const user = usersData.users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        // Cek apakah username ada
        const usernameExists = usersData.users.some((u) => u.username === username);

        if (!usernameExists) {
          // Username salah
          setUsernameError('Invalid username');

          // Cek juga apakah password akan valid untuk username yang benar
          const wouldPasswordBeValid = usersData.users.some((u) => u.password === password);
          if (!wouldPasswordBeValid) {
            setPasswordError('Invalid password');
          }
        } else {
          // Username benar tapi password salah
          setPasswordError('Invalid password');
        }

        setIsLoading(false);
        return;
      }

      // Login berhasil
      console.log('Login successful!', user);

      // Simpan user data ke sessionStorage (opsional)
      sessionStorage.setItem('user', JSON.stringify(user));

      // Redirect ke dashboard
      window.location.href = '/dashboard';

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col m-16 p-12 rounded-2xl backdrop-blur-lg shadow-xl border-white/10 border max-w-lg w-full justify-center items-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <img src={base_logo} className="w-48" alt="Logo" />
        <div className="flex flex-col w-full ">
          <h1>Welcome!</h1>
          <div>Please enter your details.</div>
        </div>

        <form className="login-form w-full" onSubmit={handleLogin}>
          <div className="userid-section flex flex-row gap-4 mt-4 mb-4">
            <Input
              variant="text"
              label="Username"
              placeholder="Enter your username"
              error={usernameError}
              isValid={!usernameError}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          </div>

          <div className="password-section flex flex-row gap-4 mt-4 mb-4">
            <Input
              variant="password"
              label="Password"
              placeholder="Enter your password"
              error={passwordError}
              isValid={!passwordError}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />
          </div>

          <div className="flex flex-row gap-4 place-content-between">
            <label className="flex flex-row gap-2">
              <input type="checkbox" style={{ zoom: 1.5 }} />
              Remember me
            </label>
            <div className="ml-auto mr-4">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <div className="recaptcha border p-4 mt-8 mb-8">Recaptcha</div>

          <div className="flex items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Log In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}