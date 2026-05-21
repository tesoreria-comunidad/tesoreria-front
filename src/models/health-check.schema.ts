import z from "zod";

export const AlertSeveritySchema = z.enum(["CRITICA", "ALTA", "MEDIA", "BAJA"]);
export type TAlertSeverity = z.infer<typeof AlertSeveritySchema>;

export const HealthAlertSchema = z.object({
  id: z.string(),
  severity: AlertSeveritySchema,
  entity: z.string(),
  count: z.number(),
  description: z.string(),
  affectedIds: z.array(z.string()),
});

export type THealthAlert = z.infer<typeof HealthAlertSchema>;
