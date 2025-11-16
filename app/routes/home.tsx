import type { Route } from "./+types/home";
import { useState } from "react";

import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6">
      <button
        type="button"
        className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      <Card title="Hello">Body</Card>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        size="md"
      >
        <p>This is the content inside the modal!</p>
      </Modal>
    </div>
  );
}