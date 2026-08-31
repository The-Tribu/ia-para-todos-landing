import type { APIRoute } from "astro";
import { getTierStatus } from "../../lib/brevo";

export const prerender = false;

interface RegistrationPayload {
  nombre: string;
  email: string;
  telefono: string;
  profesion: string;
}

const BREVO_LIST_ID = Number.parseInt(import.meta.env.BREVO_LIST_ID ?? "0", 10);

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) {
    return json({ error: "Servidor sin configurar. Contacta al administrador." }, 500);
  }

  let payload: RegistrationPayload;
  try {
    payload = (await request.json()) as RegistrationPayload;
  } catch {
    return json({ error: "Payload inválido" }, 400);
  }

  const { nombre, email, telefono, profesion } = payload;
  if (!nombre || !email || !telefono || !profesion) {
    return json({ error: "Faltan campos obligatorios" }, 400);
  }

  const { tier } = await getTierStatus(apiKey, BREVO_LIST_ID);

  const nameParts = nombre.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const baseAttributes = {
    FIRSTNAME: firstName,
    LASTNAME: lastName,
    SMS: telefono,
    WHATSAPP: telefono,
    PROFESION: profesion,
  };

  const brevoBody =
    tier !== null
      ? {
          email,
          attributes: { ...baseAttributes, ESTADO_PAGO: 2, COHORTE: "cohorte-3", NIVEL: tier },
          listIds: BREVO_LIST_ID > 0 ? [BREVO_LIST_ID] : undefined,
          updateEnabled: true,
        }
      : {
          email,
          attributes: { ...baseAttributes, ESTADO_PAGO: 1, COHORTE: "cohorte-4" },
          listIds: BREVO_LIST_ID > 0 ? [BREVO_LIST_ID] : undefined,
          updateEnabled: true,
        };

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(brevoBody),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Brevo error:", res.status, body);
      return json({ error: "No pudimos guardar tu registro. Intenta de nuevo." }, 502);
    }

    return json({ ok: true, nivelAsignado: tier });
  } catch (err) {
    console.error("Brevo request failed:", err);
    return json({ error: "Error de conexión. Intenta de nuevo." }, 500);
  }
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
