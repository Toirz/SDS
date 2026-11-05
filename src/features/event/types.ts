export type RegistrationStatus = "unavailable" | "open" | "closed";

export interface RegistrationSettings {
  registrationUrl: string | null;
  registrationStatus: RegistrationStatus;
}

export interface EventConfig extends RegistrationSettings {
  name: string;
  shortName: string;
  organizer: string;
  year: string;
  description: string;
  hero: { motifCaption: string };
  audience: string;
  venue: string;
  teamSize: string;
  entryFee: string;
  dates: { registrationOpens: string; registrationDeadline: string; start: string; end: string };
  prizes: { statement: string; amount: string; currency: string; intro: string };
  contactEmail: string;
  instagramUrl: string;
  sourcePostUrl: string;
  logo: { src: string; alt: string; width: number; height: number };
  navigation: { href: string; label: string }[];
  overview: { title: string; intro: string; detail: string };
  expectations: { title: string; items: { title: string; description: string }[] };
  tracks: { title: string; intro: string; prerequisites: string; items: { name: string; level: string; description: string }[] };
  milestonesNote: string;
  milestones: { label: string; date: string; description: string }[];
  faq: { question: string; answer: string }[];
  registrationQuestion: string;
  registrationMessages: Record<RegistrationStatus, string>;
  contactQuestion: string;
  closing: { title: string; intro: string; contactLabel: string };
}
