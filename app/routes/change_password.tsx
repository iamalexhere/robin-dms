import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import Modal from "~/components/ui/Modal"
import { useState } from "react";
import base_logo from "../../public/image/base_logo@2.png";
import usersData from "~/data/users.json";

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Error states untuk field password error
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Fungsi untuk handle change password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setConfirmPasswordError('');
    setIsLoading(true);

    // Simulasi delay untuk loading
    setTimeout(() => {
      // Mendapatkan POST METHOD untuk tau user mana
      const user = "dari POST METHOD";

      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters')
        setIsLoading(false);
        return
      }
      if (password != confirm_password) {
        setConfirmPasswordError('Passwords do not match')
        setIsLoading(false);
        return
      }

      //BELOM ADA FUNCTION BUAT NGUBAH FILE DI JSON

      //Password telah diubah
      console.log('Password Changed', user);
      setIsModalOpen(true);

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div
        className="flex flex-col p-12 rounded-2xl backdrop-blur-lg shadow-xl border-white/10 border max-w-lg  w-full justify-center items-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <img src={base_logo} className="w-48" alt="Logo" />
        <div className="flex flex-col w-full ">
          <h2>Change password</h2>
          <div>Make sure it's at least 8 characters.</div>
        </div>

        <form className="change-password-form w-full" onSubmit={handleChangePassword}>
          <div className="password-section flex flex-row gap-4 mt-4 mb-4">
            <Input
              variant="password"
              placeholder="Password"
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

          <div className="password-section flex flex-row gap-4 mt-4 mb-4">
            <Input
              variant="password"
              placeholder="Confirm Password"
              error={confirmPasswordError}
              isValid={!confirmPasswordError}
              value={confirm_password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError('');
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />
          </div>

          <div className="flex items-center justify-center mt-10">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Change password'}
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Password changed!"
        size="md"
      >
        <div className="mt-2">Your password has been changed successfully.</div>
        <div className="flex items-center justify-center mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              window.location.href = '/login';
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Return to login'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

