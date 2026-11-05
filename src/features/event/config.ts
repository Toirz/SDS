import type { EventConfig } from "./types";

// Participant-facing facts from the Datathon Proposal AY26/27. Internal planning items
// (partner finalisation, internal grading, room bookings, shortlist sizes) stay out of the site.
const dates = {
  registrationOpens: "2026-12-28",
  registrationDeadline: "2027-01-14",
  workshopOne: "2027-01-16",
  workshopTwo: "2027-01-23",
  start: "2027-01-30",
  submissionDeadline: "2027-02-09",
  resultsRelease: "2027-02-15",
  finalistSlidesDue: "2027-02-19",
  end: "2027-02-20",
};
const prizeAmount = "1,000";

export const event: EventConfig = {
  name: "NUS SDS Datathon 2027",
  shortName: "NUS Datathon 2027",
  organizer: "NUS SDS",
  year: "2027",
  description: "NUS SDS Datathon 2027 is a free data science competition for undergraduates in Singapore, with online workshops, a beginner-friendly and an advanced track, and a finale at NUS.",
  hero: {
    motifCaption: "Data. Perspective. Possibility.",
  },
  audience: "Undergraduate students from any discipline at universities in Singapore",
  venue: "NUS, with online workshops",
  teamSize: "3–5 members, including at least 1 NUS student",
  entryFee: "Free for all participants",
  dates: {
    registrationOpens: dates.registrationOpens,
    registrationDeadline: dates.registrationDeadline,
    start: dates.start,
    end: dates.end,
  },
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
    { href: "#tracks", label: "Tracks" },
    { href: "#dates", label: "Key Dates" },
    { href: "#faq", label: "FAQ" },
  ],
  overview: {
    title: "Curiosity meets real-world data.",
    intro: "A free competition for students who want to ask better questions, find fresh perspectives and learn by doing.",
    detail: "NUS SDS Datathon brings undergraduates from every discipline and university across Singapore together to tackle real-world problems with industry datasets. Build your skills in online workshops, then work as a team of three to five on a challenge that matches your experience — whether this is your first datathon or your next one.",
  },
  expectations: {
    title: "More than a competition.",
    items: [
      { title: "Explore real-world challenges.", description: "Work with industry datasets and use data to understand problems beyond the classroom." },
      { title: "Learn along the way.", description: "Prepare with two online workshops before the event and an in-person workshop on opening day. Beginners and experienced participants are welcome." },
      { title: "Think better, together.", description: "Team up with fellow students from across Singapore. Finalists present their work live at NUS." },
    ],
  },
  tracks: {
    title: "Two tracks. Find your starting point.",
    intro: "Choose the track that matches your experience with data. Each track has its own real-world dataset.",
    prerequisites: "Recommended for both tracks: proficiency in Python and core data science libraries such as pandas, NumPy, seaborn and Matplotlib. Knowledge of machine learning and large language models is a plus.",
    items: [
      { name: "Category A", level: "Standard", description: "New to datathons? Start here. Explore a real-world dataset, build your confidence and put your fundamentals to work." },
      { name: "Category B", level: "Advanced", description: "Ready for a deeper challenge? Take on a more demanding dataset and push your analytical and modelling skills further." },
    ],
  },
  milestonesNote: "All times are in Singapore Time (SGT).",
  milestones: [
    { label: "Registration opens", date: dates.registrationOpens, description: "Sign up as a team, or on your own using the Team Finder option." },
    { label: "Registration closes", date: dates.registrationDeadline, description: "Last day to register, by 11:59 pm." },
    { label: "Online workshop 1", date: dates.workshopOne, description: "Useful libraries and modelling approaches for real-time data analysis and prediction." },
    { label: "Online workshop 2", date: dates.workshopTwo, description: "Working with frontier AI models: their limitations and how to address them." },
    { label: "Opening ceremony", date: dates.start, description: "At NUS. Problem statements are released, followed by an in-person workshop." },
    { label: "Submission deadline", date: dates.submissionDeadline, description: "Submit your code and supporting materials online by 11:59 pm." },
    { label: "Finalists announced", date: dates.resultsRelease, description: "Shortlisted teams are notified and begin preparing their presentations." },
    { label: "Finalist slides due", date: dates.finalistSlidesDue, description: "Finalists submit their completed presentation slides by 9:00 pm." },
    { label: "Finale and closing", date: dates.end, description: "At NUS. Finalists present to the judges, followed by the prize presentation." },
  ],
  faq: [
    { question: "Who can participate?", answer: "Current undergraduate students based in Singapore, from any discipline and any local university. Participants must not be working full-time professionally." },
    { question: "Is there a participation fee?", answer: "No. The competition is free of charge for all participants." },
    { question: "How big can a team be?", answer: "Teams have 3 to 5 members, and each team must include at least one NUS student." },
    { question: "What if I don't have a full team?", answer: "Sign up with fewer than three members and select the Team Finder option on the registration form, then complete the Team Finder form. The organisers will assign you to a team." },
    { question: "Do I need experience with data?", answer: "Beginners and experienced participants are welcome. Category A is the standard track and Category B is advanced. Proficiency in Python and libraries such as pandas, NumPy, seaborn and Matplotlib is recommended, and the workshops help you prepare." },
    { question: "When and where does the event take place?", answer: `Online workshops run on ${formatEventDate(dates.workshopOne)} and ${formatEventDate(dates.workshopTwo)}. The opening ceremony is at NUS on ${formatEventDate(dates.start)}, submissions are due online on ${formatEventDate(dates.submissionDeadline)}, and the finale is at NUS on ${formatEventDate(dates.end)}.` },
    { question: "How many times can we submit?", answer: "There is no submission limit. Only your team's latest submission before the deadline is considered for judging." },
    { question: "Who owns our work and the datasets?", answer: "All intellectual property submitted for the competition belongs to the dataset partner. Datasets are for competition use only, and sharing code or data outside your team is not permitted. Participants are required to sign a non-disclosure agreement." },
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
