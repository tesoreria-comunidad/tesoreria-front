/*
API RESPONSE

 {
          id_rama: rama.id,
          rama: rama.name,
          totalEsperado: Number(totalEsperado.toFixed(2)),
          totalCobrado: Number(totalCobrado.toFixed(2)),
          cobrabilidad: Number(cobrabilidad.toFixed(2)),
        };
*/

import z from "zod";

export const CobrabilidadSchema = z.object({
  id_rama: z.string(),
  rama: z.string(),
  totalEsperado: z.number(),
  totalCobrado: z.number(),
  cobrabilidad: z.number(),
});

export type TCobrabilidad = z.infer<typeof CobrabilidadSchema>;
