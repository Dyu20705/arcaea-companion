import { Link } from "react-router";

export function NotFoundRoute() {
  return (
    <section className="route-state" aria-labelledby="not-found-title">
      <p className="eyebrow">404 · Fragment unavailable</p>
      <h1 id="not-found-title">The requested fragment could not be found.</h1>
      <p>It may have moved, become unavailable, or never existed.</p>
      <Link className="secondary-action" to="/">
        Return home
      </Link>
    </section>
  );
}
