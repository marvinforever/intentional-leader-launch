import { createFileRoute, redirect } from "@tanstack/react-router";

// The inaugural (Founding Class) offer has closed. Intentional Leader is now a permanent program.
export const Route = createFileRoute("/inaugural")({
  beforeLoad: () => {
    throw redirect({ to: "/intentional-leader", statusCode: 301 });
  },
});
