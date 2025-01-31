import { UserAgentData } from "./shared.types";

// navigator.d.ts
export {};

declare global {
  interface Navigator {
    userAgentData?: UserAgentData;
  }
}
