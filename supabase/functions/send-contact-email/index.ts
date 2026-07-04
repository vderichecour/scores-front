/// <reference path="../deno.d.ts" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validatePayload(data: unknown): ContactPayload | string {
  if (!data || typeof data !== "object") return "Corps de requête invalide";

  const { first_name, last_name, email, message } = data as Record<
    string,
    unknown
  >;

  if (
    typeof first_name !== "string" ||
    first_name.trim().length < 1 ||
    first_name.length > 100
  ) {
    return "Prénom invalide";
  }
  if (
    typeof last_name !== "string" ||
    last_name.trim().length < 1 ||
    last_name.length > 100
  ) {
    return "Nom invalide";
  }
  if (
    typeof email !== "string" ||
    email.trim().length < 3 ||
    email.length > 255 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return "Email invalide";
  }
  if (
    typeof message !== "string" ||
    message.trim().length < 1 ||
    message.length > 5000
  ) {
    return "Message invalide";
  }

  return {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée" }, 405);
  }

  try {
    const adminEmail = Deno.env.get("ADMIN_EMAIL_ADDRESS");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail =
      Deno.env.get("RESEND_FROM_EMAIL") ?? "Contact <onboarding@resend.dev>";

    if (!adminEmail) {
      return jsonResponse({ error: "ADMIN_EMAIL_ADDRESS non configurée" }, 500);
    }
    if (!resendApiKey) {
      return jsonResponse({ error: "Service email non configuré" }, 500);
    }

    const body = await req.json();
    const validated = validatePayload(body);
    if (typeof validated === "string") {
      return jsonResponse({ error: validated }, 400);
    }

    const { first_name, last_name, email, message } = validated;
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
      return jsonResponse({ error: "Impossible d'envoyer l'email" }, 500);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: "Erreur serveur" }, 500);
  }
});
