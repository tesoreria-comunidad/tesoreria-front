import type { TGrupoScout, TRama } from "@/models";

/**
 * Orden canónico de los nombres de rama para UI.
 * Los IDs autoritativos siempre vienen de la API — estas constantes
 * solo se usan para ordenar listas, mostrar etiquetas y determinar
 * adyacencia en el selector de traspaso.
 */

export interface RamaUiConfig {
  grupo: TGrupoScout;
  orden: number;
  label: string;
  edadMin: number;
  edadMax: number;
}

export const RAMAS_UI_CONFIG: RamaUiConfig[] = [
  { grupo: "SCOUTS", orden: 1, label: "Manada",     edadMin: 6,  edadMax: 9  },
  { grupo: "SCOUTS", orden: 2, label: "Unidad",     edadMin: 10, edadMax: 14 },
  { grupo: "SCOUTS", orden: 3, label: "Caminantes", edadMin: 15, edadMax: 17 },
  { grupo: "SCOUTS", orden: 4, label: "Rovers",     edadMin: 18, edadMax: 21 },
  { grupo: "GUIAS",  orden: 1, label: "Alitas",     edadMin: 6,  edadMax: 9  },
  { grupo: "GUIAS",  orden: 2, label: "Caravana",   edadMin: 10, edadMax: 14 },
  { grupo: "GUIAS",  orden: 3, label: "Solar",      edadMin: 15, edadMax: 17 },
  { grupo: "GUIAS",  orden: 4, label: "Clan",       edadMin: 18, edadMax: 21 },
];

export const GRUPO_LABELS: Record<TGrupoScout, string> = {
  SCOUTS: "Scouts",
  GUIAS: "Guías",
};

export function getAdjacentRamas(
  currentRama: TRama,
  allRamas: TRama[]
): { anterior: TRama | null; siguiente: TRama | null } {
  const sameGroup = allRamas.filter((r) => r.grupo === currentRama.grupo);
  const anterior = sameGroup.find((r) => r.orden === currentRama.orden - 1) ?? null;
  const siguiente = sameGroup.find((r) => r.orden === currentRama.orden + 1) ?? null;
  return { anterior, siguiente };
}

/**
 * Devuelve las ramas del mismo grupo separadas en dos listas:
 * - `adyacentes`: la inmediatamente anterior y la siguiente (orden ±1)
 * - `otrasDelGrupo`: el resto del grupo, excluida la rama actual y las adyacentes
 * Ambas listas están ordenadas por `orden` ascendente.
 */
export function getGroupRamasForTransfer(
  currentRama: TRama,
  allRamas: TRama[]
): { adyacentes: TRama[]; otrasDelGrupo: TRama[] } {
  const sameGroup = allRamas
    .filter((r) => r.grupo === currentRama.grupo && r.id !== currentRama.id)
    .sort((a, b) => a.orden - b.orden);

  const adyacentes = sameGroup.filter(
    (r) => Math.abs(r.orden - currentRama.orden) === 1
  );
  const otrasDelGrupo = sameGroup.filter(
    (r) => Math.abs(r.orden - currentRama.orden) !== 1
  );

  return { adyacentes, otrasDelGrupo };
}
