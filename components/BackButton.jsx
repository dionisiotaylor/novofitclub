"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import IconChevron from "@assets/icons/chevron.svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="back-button">
      <span>
        <IconChevron />
        Atrás
      </span>
    </button>
  );
}