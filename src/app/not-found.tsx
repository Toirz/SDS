import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found section">
      <Container>
        <p className="eyebrow">404 / Page not found</p>
        <h1>This page is off the grid.</h1>
        <p>The page you are looking for could not be found.</p>
        <Link className="button button-primary" href="/">Back to the event <span aria-hidden="true">↗</span></Link>
      </Container>
    </main>
  );
}
