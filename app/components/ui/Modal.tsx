import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses: Record<NonNullable<typeof size>, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      <div
        className={`relative w-full ${sizeClasses[size]} rounded-xl bg-white p-6 shadow-lg`}
      >
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {title}
          </h2>
        )}

        <div className="text-sm text-slate-700">{children}</div>

        <button
          type="button"
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}