import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { appRoutes } from "../app/router";

export function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
}