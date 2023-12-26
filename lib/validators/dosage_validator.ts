import { z } from "zod";

export const DosageValidator = z.object({
  infusionSpeed: z.string(),
  solutionAmount: z.string(),
  drugAmount: z.string(),
  weight: z.string().optional(),
});

export type TDosageValidator = z.infer<typeof DosageValidator>;
