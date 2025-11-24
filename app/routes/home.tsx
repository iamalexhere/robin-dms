// app/routes/home.tsx
import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import Filter from "../components/ui/Filter";
import Search from "../components/ui/Search";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");

  // Validasi username: minimal 3 karakter
  const isUsernameValid = username.length >= 3;

  // Validasi password: minimal 8 karakter
  const isPasswordValid = password.length >= 8;

  // Data untuk Customer Table
  const customerColumns = [
    { key: 'customerId', header: 'Customer ID', width: '140px' },
    { key: 'name', header: 'Name', width: '200px' },
    { key: 'phone', header: 'Phone', width: '150px' },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City', width: '150px' },
    { key: 'action', header: 'Action', width: '100px' },
  ];

  const customerData = [
    {
      customerId: 'CUST-001',
      name: 'John Doe',
      phone: '+62812...',
      email: 'john@mail.com',
      city: 'Bandung',
      action: (
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )
    },
    {
      customerId: 'CUST-002',
      name: 'Maria Tan',
      phone: '+62877...',
      email: 'maria@mail.com',
      city: 'Jakarta',
      action: (
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )
    },
    {
      customerId: 'CUST-003',
      name: 'Budi Santoso',
      phone: '+62813...',
      email: 'budi@mail.com',
      city: 'Surabaya',
      action: (
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )
    },
  ];

  // Data untuk User Table
  const userColumns = [
    { key: 'userId', header: 'User ID', width: '120px' },
    { key: 'name', header: 'Name', width: '180px' },
    { key: 'dealer', header: 'Dealer', width: '150px' },
    { key: 'role', header: 'Role', width: '180px' },
    { key: 'status', header: 'Status', width: '120px' },
    { key: 'edit', header: 'Edit', width: '100px' },
  ];

  const userData = [
    {
      userId: 'USR001',
      name: 'John Doe',
      dealer: 'Bandung',
      role: 'Dealer Admin',
      status: 'Active',
      edit: '-'
    },
    {
      userId: 'USR002',
      name: 'Maria Tan',
      dealer: 'Bandung',
      role: 'Dealer Normal',
      status: 'Inactive',
      edit: (
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )
    },
    {
      userId: 'USR003',
      name: 'Budi Santoso',
      dealer: 'Bandung',
      role: 'DMS Admin',
      status: 'Active',
      edit: (
        <button className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )
    },
  ];

  // Data untuk User Activity Log
  const activityColumns = [
    { key: 'userId', header: 'User ID', width: '120px' },
    { key: 'activity', header: 'Activity', width: '200px' },
    { key: 'timestamp', header: 'Timestamp', width: '200px' },
    { key: 'status', header: 'Status', width: '150px' },
  ];

  const activityData = [
    {
      userId: 'USR001',
      activity: 'Login',
      timestamp: '2025-11-05 11:34',
      status: 'Success',
    },
    {
      userId: 'USR002',
      activity: 'Print Report',
      timestamp: '2025-11-05 11:34',
      status: 'Success',
    },
    {
      userId: 'USR003',
      activity: 'Access',
      timestamp: '2025-11-05 11:34',
      status: 'Success',
    },
  ];

  // Data untuk Report Summary
  const reportColumns = [
    { key: 'date', header: 'Date', width: '150px' },
    { key: 'reportType', header: 'Report Type', width: '180px' },
    { key: 'dealerBranch', header: 'Dealer Branch', width: '180px' },
    { key: 'totalValue', header: 'Total Value', width: '150px' },
    { key: 'status', header: 'Status', width: '150px' },
  ];

  const reportData = [
    {
      date: '05-11-2025',
      reportType: 'Sales',
      dealerBranch: 'Bandung',
      totalValue: 'Rp 123',
      status: 'Completed',
    },
    {
      date: '05-11-2025',
      reportType: 'MRN',
      dealerBranch: 'Bandung',
      totalValue: 'Rp 123',
      status: 'Pending',
    },
    {
      date: '05-11-2025',
      reportType: 'Service',
      dealerBranch: 'Bandung',
      totalValue: 'Rp 123',
      status: 'Completed',
    },
  ];

  return (
    <div className="px-4 pt-3 pb-4">
      {/* H1 dengan warna dari color palette */}
      <h1 style={{ color: 'var(--color-primary)' }}>
        UI Component Style
      </h1>

      {/* DIV untuk semua button */}
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

      {/* DIV untuk semua Input */}
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

      {/* DIV untuk Table */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        {/* Section 1: Customer Master */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Customer Master
          </h2>
          <Table
            columns={customerColumns}
            data={customerData}
          />
        </div>

        {/* Section 2: User List */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            User List
          </h2>
          <Table
            columns={userColumns}
            data={userData}
          />
        </div>

        {/* Section 3: User Activity Log */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            User Activity Log
          </h2>
          <Table
            columns={activityColumns}
            data={activityData}
          />
        </div>

        {/* Section 4: Report Summary */}
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Report Summary
          </h2>
          <Table
            columns={reportColumns}
            data={reportData}
          />
        </div>
      </div>
      {/* END: DIV TABLE */}

      {/* DIV untuk Card */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Card Component
          </h2>

          <div className="space-y-4">
            {/* Card with Title */}
            <Card title="Card with Title">
              <p className="text-gray-700">This is a card component with a title header.</p>
            </Card>

            {/* Card without Title */}
            <Card>
              <p className="text-gray-700">This is a card without a title.</p>
            </Card>

            {/* Card with Custom Content */}
            <Card title="User Information">
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> john@example.com</p>
                <p><strong>Role:</strong> Administrator</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* END: DIV CARD */}

      {/* DIV untuk Modal */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Modal Component
          </h2>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <p>This is the content inside the modal!</p>
            <p className="mt-2">You can add any content here.</p>
          </Modal>
        </div>
      </div>
      {/* END: DIV MODAL */}

      {/* DIV untuk Filter */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Filter Component
          </h2>

          <Filter
            value={role}
            onChange={setRole}
            placeholder="Filter by role"
            options={[
              { label: "All", value: "all" },
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "Staff", value: "staff" },
            ]}
          />
        </div>
      </div>
      {/* END: DIV FILTER */}

      {/* DIV untuk Search */}
      <div
        className="mt-6 p-6 rounded-lg space-y-8"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div>
          <h2 className="mb-3" style={{ color: 'var(--color-text-base)' }}>
            Search Component
          </h2>

          <Search
            value={query}
            onChange={setQuery}
            placeholder="Search by ID, name, or role"
          />
        </div>
      </div>
      {/* END: DIV SEARCH */}
    </div>
  );
}