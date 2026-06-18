import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be under 200 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(300, "Email must be under 300 characters")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number must be under 20 characters")
    .regex(/^[\d\s\+\-\(\)\.]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Please enter a valid URL including https://")
    .max(500, "Website URL must be under 500 characters")
    .optional()
    .or(z.literal("")),
  adSpend: z.enum([
    "",
    "under-1k",
    "1k-5k",
    "5k-10k",
    "10k-25k",
    "25k-50k",
    "50k-plus",
  ]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export const auditSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(300, "Email must be under 300 characters")
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be under 200 characters")
    .trim(),
  website: z
    .string()
    .url("Please enter a valid URL including https://")
    .max(500, "Website URL must be under 500 characters")
    .optional()
    .or(z.literal("")),
  adSpend: z.enum([
    "",
    "under-1k",
    "1k-5k",
    "5k-10k",
    "10k-25k",
    "25k-50k",
    "50k-plus",
  ]),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type AuditFormData = z.infer<typeof auditSchema>;
