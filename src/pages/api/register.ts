import type { APIRoute } from "astro";
import { getTierStatus } from "../../lib/brevo";
import { COHORTE } from "../../lib/cohorte";

export const prerender = false;

interface RegistrationPayload {
  nombre: string;
  email: string;
  telefono: string;
  profesion: string;
}

// Lista de prospectos: ahí escribe el formulario. El paso a la lista de estudiantes es manual.
const BREVO_LIST_ID = Number.parseInt(import.meta.env.BREVO_LIST_ID ?? "11", 10);
// Lista de estudiantes: solo se lee, para derivar el tier vigente.
const BREVO_STUDENTS_LIST_ID = Number.parseInt(import.meta.env.BREVO_STUDENTS_LIST_ID ?? "13", 10);

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

  // Un contacto que ya pagó no se toca: el upsert lo degradaría a "pendiente por pagar" y su
  // cupo desaparecería del conteo. Pasó en producción con un estudiante que llenó el formulario
  // después de pagar.
  const yaPagado = await getContactoPagado(apiKey, email);
  if (yaPagado) {
    const nivel = Number.parseInt(yaPagado.NIVEL ?? "", 10);
    return json({
      ok: true,
      yaInscrito: true,
      nivelAsignado: Number.isNaN(nivel) ? null : nivel,
    });
  }

  const { tier } = await getTierStatus(apiKey, BREVO_STUDENTS_LIST_ID);

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
          attributes: { ...baseAttributes, ESTADO_PAGO: 2, COHORTE: COHORTE.slug, NIVEL: tier },
          listIds: BREVO_LIST_ID > 0 ? [BREVO_LIST_ID] : undefined,
          updateEnabled: true,
        }
      : {
          email,
          attributes: { ...baseAttributes, ESTADO_PAGO: 2, COHORTE: COHORTE.siguienteSlug },
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

    return json({ ok: true, yaInscrito: false, nivelAsignado: tier });
  } catch (err) {
    console.error("Brevo request failed:", err);
    return json({ error: "Error de conexión. Intenta de nuevo." }, 500);
  }
};

// Devuelve los atributos del contacto solo si ya está pagado (ESTADO_PAGO=3); null en cualquier
// otro caso, incluido que no exista o que Brevo falle — ahí seguimos con el registro normal.
async function getContactoPagado(
  apiKey: string,
  email: string
): Promise<Record<string, string | undefined> | null> {
  try {
    const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      headers: { Accept: "application/json", "api-key": apiKey },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Brevo ${res.status}`);

    const contact = (await res.json()) as {
      attributes?: Record<string, string | undefined>;
    };
    const attributes = contact.attributes ?? {};
    return attributes.ESTADO_PAGO === "3" ? attributes : null;
  } catch (err) {
    console.error("Brevo contact lookup failed:", err);
    return null;
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
