"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const IrisPlaceholder = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    style={{ color: "var(--teal)" }}
  >
    <path
      d="M4 32 C16 14 48 14 60 32 C48 50 16 50 4 32Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.25" />
  </svg>
);

export default function PlaceholderImage({ onError, ...props }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--teal-pale) 0%, var(--light) 100%)",
        }}
      >
        <IrisPlaceholder />
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={(e) => {
        setErrored(true);
        onError?.(e);
      }}
    />
  );
}
