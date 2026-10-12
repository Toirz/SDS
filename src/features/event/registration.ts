import type { RegistrationSettings } from "./types.ts";

export function getRegistrationState({ registrationStatus, registrationUrl }: RegistrationSettings) {
  if (registrationStatus === "closed") {
    return { label: "Registration closed", href: null };
  }

  if (registrationStatus === "open" && registrationUrl && /^https?:\/\//i.test(registrationUrl)) {
    try {
      const url = new URL(registrationUrl);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return { label: "Register now", href: url.href };
      }
    } catch {
      // A mistyped destination must leave registration disabled.
    }
  }

  return { label: "Registration unavailable", href: null };
}
