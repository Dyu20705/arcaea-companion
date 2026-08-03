import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from "react-router";

export function RootRouteErrorBoundary() {
  const error = useRouteError();

  const description = isRouteErrorResponse(error)
    ? `The route failed with status ${error.status}.`
    : "The application could not render this route.";

  return (
    <section className="route-state" role="alert">
      <h1>Something went wrong</h1>
      <p>{description}</p>
      <Link to="/">Return home</Link>
    </section>
  );
}