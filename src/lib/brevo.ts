export interface TierStatus {
  tier: 1 | 2 | 3 | null;
  cuposDisponibles: number;
}

const CAPS = { pioneros: 4, earlyBird: 6, general: 2 } as const;

interface BrevoContact {
  attributes: Record<string, string | undefined>;
}

export async function getTierStatus(
  apiKey: string,
  listId: number
): Promise<TierStatus> {
  try {
    const url = new URL("https://api.brevo.com/v3/contacts");
    url.searchParams.set("listIds", String(listId));
    url.searchParams.set("limit", "1000");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", "api-key": apiKey },
    });

    if (!res.ok) throw new Error(`Brevo ${res.status}`);

    const data = (await res.json()) as { contacts: BrevoContact[] };
    const contacts = data.contacts ?? [];

    // Un cupo se considera tomado solo cuando NIVEL está asignado y ESTADO_PAGO=3 (pagado)
    const relevant = contacts.filter(
      (c) =>
        c.attributes.COHORTE === "cohorte-3" &&
        c.attributes.NIVEL !== undefined &&
        c.attributes.ESTADO_PAGO === "3"
    );

    const pioneros = relevant.filter((c) => c.attributes.NIVEL === "1").length;
    const earlyBird = relevant.filter((c) => c.attributes.NIVEL === "2").length;
    const general = relevant.filter((c) => c.attributes.NIVEL === "3").length;

    if (pioneros < CAPS.pioneros) return { tier: 1, cuposDisponibles: CAPS.pioneros - pioneros };
    if (earlyBird < CAPS.earlyBird) return { tier: 2, cuposDisponibles: CAPS.earlyBird - earlyBird };
    if (general < CAPS.general) return { tier: 3, cuposDisponibles: CAPS.general - general };
    return { tier: null, cuposDisponibles: 0 };
  } catch {
    return { tier: 1, cuposDisponibles: CAPS.pioneros };
  }
}
