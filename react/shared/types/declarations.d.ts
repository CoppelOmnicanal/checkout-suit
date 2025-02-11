import { UserAgentData } from "./shared.types";

// navigator.d.ts
export {};

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare global {
  interface Navigator {
    userAgentData?: UserAgentData;
  }
}
