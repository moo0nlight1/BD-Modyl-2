import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serialize(array: Array<any> | object, name: string): string {
  let count = "";

  if (Array.isArray(array)) {
    array.forEach((c) => {
      count = c[name].toString();
    });
  } else {
    // @ts-ignore
    count = array[name].toString();
  }

  return count;
}
