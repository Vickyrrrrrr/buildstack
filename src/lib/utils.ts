// Utility functions

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type FirestoreLikeDate = {
  toDate: () => Date;
};

function resolveDateValue(date: unknown): Date {
  if (
    typeof date === "object" &&
    date !== null &&
    "toDate" in date &&
    typeof (date as FirestoreLikeDate).toDate === "function"
  ) {
    return (date as FirestoreLikeDate).toDate();
  }

  return new Date(date as string | number | Date);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: unknown): string {
  if (!date) return "N/A";

  const dateObj = resolveDateValue(date);

  if (Number.isNaN(dateObj.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObj);
}

export function formatDateTime(date: unknown): string {
  if (!date) return "N/A";

  const dateObj = resolveDateValue(date);

  if (Number.isNaN(dateObj.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(dateObj);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
