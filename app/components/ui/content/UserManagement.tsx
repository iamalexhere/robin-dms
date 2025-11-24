import { useState } from "react";
import Search from "../Search";
import Modal from "../Modal";
import { Button } from "../Button";
import { Table } from "../Table";
import { Input } from "../Input";

import usersFile from "~/data/users.json";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Extract user list from JSON
  const users: User[] = usersFile.users;

  // Filtered search
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  // Table columns (MUST follow Table.tsx structure)
  const columns = [
    { key: "id", header: "User ID", width: "120px" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", width: "150px" },
  ];

  // Table data must be array of objects with matching key names
  const data = filtered.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
  }));

  return (
    <div className="w-full p-6">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-white mb-6">
        User Management
      </h1>

      {/* SEARCH + ADD BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Search
          value={query}
          placeholder="Search user..."
          onChange={(val: string) => setQuery(val)}
        />

        <Button
          className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={() => setIsAddOpen(true)}
        >
          + Add User
        </Button>
      </div>

      {/* TABLE */}
      <Table columns={columns} data={data} bordered striped hoverable />

      {/* ADD USER MODAL */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New User"
        size="md"
      >
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email" placeholder="Enter email" />
          <Input label="Username" placeholder="Enter username" />
          <Input label="Role" placeholder="admin / dealer / employee" />

          <Button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={() => setIsAddOpen(false)}
          >
            Save User
          </Button>
        </div>
      </Modal>
    </div>
  );
}