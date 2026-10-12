import type { EventConfig } from "./types";

const dates = {
  start: "2026-01-17",
  end: "2026-02-07",
  registrationDeadline: "2026-01-14",
};
const prizeAmount = "1,000";

export const event: EventConfig = {
  name: "NUS SDS Datathon 2026",
  shortName: "NUS Datathon 2026",
  organizer: "NUS SDS",
  year: "2026",
  description: "NUS SDS Datathon 2026 brings Singapore university undergraduates together to tackle real-world problems with data, guided workshops and collaboration.",
  hero: {
    eyebrow: "Ideas grounded in data.",
    title: "Datathon",
    intro: "Turn data into real-world impact. Explore datasets, build ideas and solve meaningful problems together.",
    motifCaption: "Data. Perspective. Possibility.",
  },
  audience: "Undergraduate students from universities across Singapore",
  venue: "NUS Lecture Theatre",
  dates,
  prizes: {
    statement: `Prizes worth up to SGD ${prizeAmount}.`,
    amount: prizeAmount,
    currency: "SGD",
    intro: "Bring your curiosity. Put your ideas to work.",
  },
  contactEmail: "statistics.society@u.nus.edu",
  instagramUrl: "https://www.instagram.com/nus.sds/",
  sourcePostUrl: "https://www.instagram.com/p/DSr84_4EtkO/",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdu4_BHd9Aua3wc7cBTvlvC2P0KJeHwNw_lZVO8UYO1ft-jYg/viewform",
  registrationStatus: "open",
  logo: {
    src: "/images/sds-logo.jpg",
    alt: "NUS SDS yellow and amber geometric cube logo",
    width: 1080,
    height: 1080,
  },
  navigation: [
    { href: "#about", label: "About" },
    { href: "#dates", label: "Key Dates" },
    { href: "#faq", label: "FAQ" },
  ],
  overview: {
    title: "Curiosity meets real-world data.",
    intro: "A competition for students who want to ask better questions, find fresh perspectives and learn by doing.",
    detail: "NUS SDS Datathon brings university undergraduates across Singapore together to tackle real-world problems. Work with datasets, learn through guided workshops and collaborate with fellow students — whether this is your first data challenge or your next one.",
  },
  expectations: {
    title: "More than a competition.",
    items: [
      { title: "Explore real-world challenges.", description: "Work with practical datasets and use data to understand problems beyond the classroom." },
      { title: "Learn along the way.", description: "Build your confidence through guided workshops and hands-on experience. Beginners and experienced participants are welcome." },
      { title: "Think better, together.", description: "Exchange perspectives and collaborate with fellow university students from across Singapore." },
    ],
  },
  milestones: [
    { label: "Registration deadline", date: dates.registrationDeadline, description: "Registration deadline for this edition." },
    { label: "Event begins", date: dates.start, description: "The start of NUS SDS Datathon 2026." },
    { label: "Event concludes", date: dates.end, description: "The final date of the competition." },
  ],
  faq: [
    { question: "Who can participate?", answer: "The competition is for undergraduate students from universities across Singapore." },
    { question: "Do I need experience with data?", answer: "Beginners and experienced participants are welcome. The event includes guided workshops and practical experience with datasets." },
    { question: "When does the event take place?", answer: `The event runs from ${formatEventDate(dates.start)} to ${formatEventDate(dates.end)}. The registration deadline is ${formatEventDate(dates.registrationDeadline)}.` },
    { question: "Where is the event held?", answer: "The venue is NUS Lecture Theatre." },
  ],
  registrationQuestion: "How can I register?",
  registrationMessages: {
    unavailable: "Registration is unavailable through this website. Please contact NUS SDS for registration enquiries.",
    open: "Use the registration link to visit the external registration form. It opens in a new tab.",
    closed: "Registration is closed. Please contact NUS SDS if you have questions.",
  },
  contactQuestion: "How can I contact the organisers?",
  closing: {
    title: "Great questions start here.",
    intro: "Explore the event, bring your curiosity and connect with NUS SDS for more information.",
    contactLabel: "Have a question? Get in touch",
  },
};

// Explicit UTC formatting preserves date-only values in every server timezone.
export function formatEventDate(value: string, month: "short" | "long" = "long") {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month, year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
