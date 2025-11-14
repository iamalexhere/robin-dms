// app/routes/home.tsx
import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Validasi username: minimal 3 karakter
  const isUsernameValid = username.length >= 3;

  // Validasi password: minimal 8 karakter
  const isPasswordValid = password.length >= 8;
  return (
    <div className="p-6">
      {/* H1 dengan warna dari color palette */}
      <h1 style={{ color: 'var(--color-primary)' }}>
        UI Component Style
      </h1>

      {/* SATU DIV BESAR untuk semua button */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >

        {/* Section 1: Button Variants */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="danger" size="md">
              Delete
            </Button>
            <Button variant="ghost" size="md">
              Ghost
            </Button>
          </div>
        </div>

        {/* Section 2: Button Sizes */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Button Sizes
          </h2>

          {/* Small Size */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm" style={{ color: 'var(--color-text-base)', opacity: 0.7 }}>
              Small (sm)
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small Primary
              </Button>
              <Button variant="secondary" size="sm">
                Small Secondary
              </Button>
              <Button variant="danger" size="sm">
                Small Danger
              </Button>
              <Button variant="ghost" size="sm">
                Small Ghost
              </Button>
            </div>
          </div>

          {/* Medium Size */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm" style={{ color: 'var(--color-text-base)', opacity: 0.7 }}>
              Medium (md)
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">
                Medium Primary
              </Button>
              <Button variant="secondary" size="md">
                Medium Secondary
              </Button>
              <Button variant="danger" size="md">
                Medium Danger
              </Button>
              <Button variant="ghost" size="md">
                Medium Ghost
              </Button>
            </div>
          </div>

          {/* Large Size */}
          <div>
            <h3 className="mb-3 text-sm" style={{ color: 'var(--color-text-base)', opacity: 0.7 }}>
              Large (lg)
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Large Primary
              </Button>
              <Button variant="secondary" size="lg">
                Large Secondary
              </Button>
              <Button variant="danger" size="lg">
                Large Danger
              </Button>
              <Button variant="ghost" size="lg">
                Large Ghost
              </Button>
            </div>
          </div>
        </div>

        {/* Section 3: Disabled State */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Disabled State
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" size="md" disabled>
              Disabled Secondary
            </Button>
            <Button variant="danger" size="md" disabled>
              Disabled Danger
            </Button>
            <Button variant="ghost" size="md" disabled>
              Disabled Ghost
            </Button>
          </div>
        </div>

      </div>
      {/* END: SATU DIV BESAR BUTTON */}

      {/* DIV BARU untuk semua Input */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >

        {/* Section 1: Input Variants */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Input Variants
          </h2>
          <div className="space-y-4">
            <Input
              variant="text"
              label="Text Input"
              placeholder="Enter text..."
            />
            <Input
              variant="password"
              label="Password Input"
              placeholder="Enter password..."
            />
            <Input
              variant="number"
              label="Number Input"
              placeholder="Enter number..."
            />
          </div>
        </div>

        {/* Section 2: Error State */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Error State
          </h2>
          <div className="space-y-4">
            <Input
              variant="text"
              label="Username"
              placeholder="Enter username"
              error="Username is required"
              isValid={isUsernameValid}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            <Input
              variant="password"
              label="Password"
              placeholder="Enter password"
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
        </div>

        {/* Section 3: Disabled State */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Disabled State
          </h2>
          <div className="space-y-4">
            <Input
              variant="text"
              placeholder="Disabled text input"
              disabled
            />
            <Input
              variant="password"
              placeholder="Disabled password"
              disabled
            />
            <Input
              variant="number"
              placeholder="Disabled number"
              disabled
            />
          </div>
        </div>

      </div>
      {/* END: DIV INPUT */}

    </div>
  );
}