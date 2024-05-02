import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isColorDark(hexColor: string) {
  const color =
    hexColor.charAt(0) === "#" ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // Red
  const g = parseInt(color.substring(2, 4), 16); // Green
  const b = parseInt(color.substring(4, 6), 16); // Blue
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance <= 0.5;
}

export function generateHash(length: number): string {
  if (length < 3) {
    throw new Error("Length must be at least 3 to include all character types");
  }

  const numbers = "0123456789";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Ensure at least one character of each type
  let result =
    numbers.charAt(Math.floor(Math.random() * numbers.length)) +
    lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)) +
    upperCase.charAt(Math.floor(Math.random() * upperCase.length));

  const allCharacters = numbers + lowerCase + upperCase;
  const charactersLength = allCharacters.length;

  // Fill the rest of the hash
  for (let i = 3; i < length; i++) {
    result += allCharacters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  // Shuffle the result to randomize the order
  return result
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

export function extractWebsiteName(url: string): string {
  const urlObject = new URL(url);

  // Extract the hostname and split by '.' to remove the domain extension
  let hostname = urlObject.hostname.replace("www.", "").split(".")[0];

  // Capitalize the first letter and return
  return hostname.charAt(0).toUpperCase() + hostname.slice(1);
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // Normalize to Normal Form Decomposed to split combined graphemes
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both sides
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple dashes with one
}
