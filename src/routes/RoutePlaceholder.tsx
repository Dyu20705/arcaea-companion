import { useMatches, type UIMatch } from "react-router";

interface PlaceholderHandle {
  title?: string;
  description?: string;
}

export function RoutePlaceholder() {
  const matches = useMatches() as UIMatch<unknown, PlaceholderHandle>[];
  const handle = [...matches].reverse().find((match) => match.handle?.title)?.handle;

  return (
    <section className="route-state" aria-labelledby="placeholder-title">
      <p className="eyebrow">Route foundation</p>
      <h1 id="placeholder-title">{handle?.title ?? "Prototype route"}</h1>
      <p>
        {handle?.description ??
          "This route is registered and ready for its dedicated synthetic prototype."}
      </p>
      <a className="secondary-action" href="/explore">
        Explore implemented components
      </a>
    </section>
  );
}
