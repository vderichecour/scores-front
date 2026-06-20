import { createFileRoute } from "@tanstack/react-router";
import { contactSchema, sendContactEmail } from "@/lib/contact-email";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" },
              { status: 400 },
            );
          }

          await sendContactEmail(parsed.data);
          return Response.json({ ok: true });
        } catch (error) {
          console.error(error);
          const message =
            error instanceof Error ? error.message : "Erreur serveur";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
