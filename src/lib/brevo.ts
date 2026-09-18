import { COHORTE, TIERS } from "./cohorte";

export interface TierStatus {
  tier: 1 | 2 | 3 | null;
  cuposDisponibles: number;
}

const [PIONEROS] = TIERS;

// Tier vigente por defecto si Brevo no responde o falta la API key.
// Actualizar a mano al avanzar la venta: nunca debe ofrecer un nivel ya agotado.
// Cohorte 4 abre sin ventas, así que el nivel vigente es el primero.
export const FALLBACK_TIER_STATUS: TierStatus = {
  tier: PIONEROS.id,
  cuposDisponibles: PIONEROS.cuposCap,
};

interface BrevoContact {
  attributes: Record<string, string | undefined>;
}

export async function getTierStatus(apiKey: string, studentsListId: number): Promise<TierStatus> {
  try {
    const url = new URL("https://api.brevo.com/v3/contacts");
    url.searchParams.set("listIds", String(studentsListId));
    url.searchParams.set("limit", "1000");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", "api-key": apiKey },
    });

    if (!res.ok) throw new Error(`Brevo ${res.status}`);

    const data = (await res.json()) as { contacts: BrevoContact[] };
    const contacts = data.contacts ?? [];

    // Un cupo se considera tomado solo cuando el contacto está en la lista de estudiantes
    // (ya filtrado por listIds) y tiene ESTADO_PAGO=3 (pagado).
    const relevant = contacts.filter(
      (c) => c.attributes.COHORTE === COHORTE.slug && c.attributes.ESTADO_PAGO === "3"
    );

    // NIVEL=4 (regalo) no ocupa cupo: al contar solo 1/2/3 queda fuera por construcción.
    const vendidos = (nivel: number) =>
      relevant.filter((c) => c.attributes.NIVEL === String(nivel)).length;

    for (const tier of TIERS) {
      const ocupados = vendidos(tier.id);
      if (ocupados < tier.cuposCap) {
        return { tier: tier.id, cuposDisponibles: tier.cuposCap - ocupados };
      }
    }

    return { tier: null, cuposDisponibles: 0 };
  } catch {
    return FALLBACK_TIER_STATUS;
  }
}
