import { Link } from "react-router";

export type RouteStateKind =
  | "loading"
  | "empty"
  | "unavailable"
  | "error"
  | "not-found";

export interface RouteStateViewModel {
  kind: RouteStateKind;
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
}

export interface RouteStateProps {
  viewModel: RouteStateViewModel;
}

export function RouteState({ viewModel }: RouteStateProps) {
  const isLoading = viewModel.kind === "loading";
  const isError = viewModel.kind === "error";

  return (
    <section
      className={`route-state route-state-${viewModel.kind}`}
      role={isError ? "alert" : isLoading ? "status" : undefined}
      aria-live={isLoading ? "polite" : undefined}
      aria-busy={isLoading || undefined}
    >
      <h1>{viewModel.title}</h1>
      <p>{viewModel.description}</p>

      {viewModel.action ? (
        <Link className="secondary-action" to={viewModel.action.href}>
          {viewModel.action.label}
        </Link>
      ) : null}
    </section>
  );
}
