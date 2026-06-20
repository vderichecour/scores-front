import { z } from "zod";

export const contactSchema = z.object({
  first_name: z.string().trim().min(1, "Prénom requis").max(100),
  last_name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(1, "Message requis").max(5000),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL_ADDRESS;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Contact <onboarding@resend.dev>";

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL_ADDRESS non configurée");
  }
  if (!resendApiKey) {
    throw new Error("Service email non configuré");
  }

  const { first_name, last_name, email, message } = payload;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      reply_to: email,
      subject: `Nouveau message de ${first_name} ${last_name}`,
      html: [
        "<h2>Nouveau message de contact</h2>",
        `<p><strong>De :</strong> ${escapeHtml(first_name)} ${escapeHtml(last_name)} &lt;${escapeHtml(email)}&gt;</p>`,
        "<p><strong>Message :</strong></p>",
        `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Resend error:", errText);
    throw new Error("Impossible d'envoyer l'email");
  }
}
