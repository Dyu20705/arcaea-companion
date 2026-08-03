export function RouteState({
  viewModel,
}: {
  viewModel: RouteStateViewModel;
}) {
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
        <Link to={viewModel.action.href}>
          {viewModel.action.label}
        </Link>
      ) : null}
    </section>
  );
}