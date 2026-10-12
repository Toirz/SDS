import { event } from "@/features/event/config";
import { getRegistrationState } from "@/features/event/registration";

export function RegistrationCTA() {
  const { label, href } = getRegistrationState(event);

  return href ? (
    <a className="button button-primary" href={href} target="_blank" rel="noopener noreferrer">
      {label}<span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <button className="button button-primary" type="button" disabled>{label}</button>
  );
}
