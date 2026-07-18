import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadInput = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source_page: z.string().trim().max(200).optional().or(z.literal("")),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadInput.parse(input))
  .handler(async ({ data }) => {
    const { getSupabaseAdmin } = await import("@/lib/supabase.server");
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service || null,
      budget: data.budget || null,
      message: data.message || null,
      source_page: data.source_page || null,
      status: "new",
    });
    if (error) {
      console.error("submitLead insert error:", error);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });
