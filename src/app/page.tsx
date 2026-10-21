import { EventHero } from "@/features/event/components/event-hero";
import { EventOverview } from "@/features/event/components/event-overview";
import { EventExpectations } from "@/features/event/components/event-expectations";
import { EventTracks } from "@/features/event/components/event-tracks";
import { EventDates } from "@/features/event/components/event-dates";
import { EventPrizes } from "@/features/event/components/event-prizes";
import { EventFAQ } from "@/features/event/components/event-faq";
import { EventClosing } from "@/features/event/components/event-closing";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <EventHero />
      <EventOverview />
      <EventExpectations />
      <EventTracks />
      <EventDates />
      <EventPrizes />
      <EventFAQ />
      <EventClosing />
    </main>
  );
}
