import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  return (
    <div
      className={`rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Header */}
      {title && (
        <div
          className={`px-4 py-3 border-b border-gray-200 font-semibold text-gray-700 ${headerClassName}`}
        >
          {title}
        </div>
      )}

      {/* Body */}
      <div className={`px-4 pb-4 pt-3 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;