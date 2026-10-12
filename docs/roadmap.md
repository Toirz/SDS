# Roadmap

## Current phase

Public English-language event information at `/`, with external registration controlled by configuration. No account, persistence, internal form, dashboard, chat or team management. Team Finder is absent from public navigation.

## Event and deployment updates

Supply and verify the new registration URL before setting status to `open`. Update historical event content deliberately for another edition. Add a real deployment domain, canonical metadata and an approved social preview asset when ready. Review the recorded lint dependency limitations before deployment.

## Future Team Finder phase

A later phase can introduce `src/app/team-finder/page.tsx` and a `src/features/team-finder/` module for its components and behavior. Keep the public event module independent so the event page continues to work without login.

Before implementation, define who can join, what information is visible, how consent and contact work, and how abuse and deletion requests are handled. Select authentication and persistence only after these requirements are approved. That phase can then add user profiles, team listings and membership behavior with server-side authorization, validation and appropriate tests.

Do not create empty directories, install services or add the public navigation entry until the feature is ready.
