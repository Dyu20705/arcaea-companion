export function NotFoundRoute() {
  return (
    <section className="route-page">
      <p className="kicker">404</p>
      <h1>Page not found</h1>
      <p>The requested prototype route does not exist.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}