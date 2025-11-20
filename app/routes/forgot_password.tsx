import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";
import { useState } from "react";
import base_logo from "../../public/image/base_logo@2.png";
import usersData from "~/data/users.json";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states untuk field email error
  const [emailError, setEmailError] = useState('');

  // Fungsi untuk handle reset password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError('');
    setIsLoading(true);

    // Simulasi delay untuk loading
    setTimeout(() => {
      // Cari user di data JSON
      const user = usersData.users.find(
        (u) => u.email === email
      );

      if (!user) {
        setEmailError('No users found');
        setIsLoading(false);
        return;
      }

      // reset password berhasil dikirim
      console.log('Reset password sent!', user);
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
          <h2>Reset your password</h2>
          <div>Enter your email and we'll send you a password reset link.</div>
        </div>

        <form className="reset-password-form w-full" onSubmit={handleResetPassword}>
          <div className="userid-section flex flex-row gap-4 mt-4 mb-4">
            <Input
              variant="text"
              placeholder="Email"
              error={emailError} // Error dari state
              isValid={!emailError} // Valid jika tidak ada error
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Clear error saat user mengetik
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
              {isLoading ? 'Loading...' : 'Send password reset email'}
            </Button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              onClick={() => window.location.href = '/login'}
              className="text-white hover:underline text-base"
            >
              Back
            </button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reset password sent!"
        size="md"
      >
        <div>Check your email for a link to reset your password.</div>
        <div className="mt-2">If it doesn't appear within a few minutes, check your spam folder.</div>
        <div className="flex items-center justify-center mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              window.location.href = '/change_password';
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Email being sent'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}