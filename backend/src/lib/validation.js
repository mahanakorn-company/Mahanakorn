import { z } from 'zod';

// 'couple' and 'family' are kept so older form versions still validate.
export const ROLES = ['host', 'couple', 'family', 'planner', 'company', 'venue', 'other'];
export const EVENT_TYPES = ['wedding', 'party', 'corporate', 'private-dinner', 'pop-up', 'other'];
export const DESTINATIONS = ['bangkok', 'phuket', 'koh-samui', 'krabi', 'hua-hin', 'bali', 'jakarta', 'india', 'other'];
export const GUEST_BANDS = ['under-50', '50-100', '100-200', '200-350', '350-plus'];
export const FUNCTIONS = ['welcome-dinner', 'mehendi', 'haldi', 'sangeet', 'wedding-lunch', 'reception', 'after-party', 'brunch'];
export const NEEDS = ['full-function', 'stations-alongside', 'not-sure'];
export const DIETS = ['vegetarian', 'vegan', 'jain', 'egg-free', 'halal', 'allergies'];

const text = (max) => z.string().trim().max(max);
const name = z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.');
const email = z.string().trim().toLowerCase().email('Please enter a valid email address.').max(160);
// International number: optional +, 7–15 digits, spaces/dashes/brackets allowed.
const phone = z
  .string()
  .trim()
  .max(24)
  .refine((v) => /^\+?[\d\s\-()]{7,24}$/.test(v) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15, {
    message: 'Please enter a WhatsApp number with country code, e.g. +91 98765 43210.'
  });
// Honeypot: real people never fill this hidden field.
const honeypot = z.string().max(0, 'Spam detected.').optional().default('');

export const inquirySchema = z
  .object({
    name,
    email,
    whatsapp: phone,
    role: z.enum(ROLES, { errorMap: () => ({ message: 'Please choose who you are.' }) }),
    eventType: z.enum(EVENT_TYPES, { errorMap: () => ({ message: 'Please choose the type of event.' }) }).optional().default('wedding'),
    date: z
      .string()
      .trim()
      .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Please choose a month and year.')
      .optional()
      .or(z.literal('')),
    dateFlexible: z.boolean().optional().default(false),
    destination: z.enum(DESTINATIONS, { errorMap: () => ({ message: 'Please choose where the event is.' }) }),
    venue: text(120).optional().default(''),
    guests: z.enum(GUEST_BANDS, { errorMap: () => ({ message: 'Please choose an approximate guest count.' }) }),
    functions: z.array(z.enum(FUNCTIONS)).max(FUNCTIONS.length).optional().default([]),
    need: z.enum(NEEDS).optional(),
    diet: z.array(z.enum(DIETS)).max(DIETS.length).optional().default([]),
    hasPlanner: z.enum(['yes', 'no']).optional(),
    message: text(2000).optional().default(''),
    company: honeypot
  })
  .superRefine((v, ctx) => {
    if (!v.dateFlexible && !v.date) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['date'], message: 'Please choose a month, or tick "Not fixed yet".' });
    }
    if (v.date) {
      const [y, m] = v.date.split('-').map(Number);
      const now = new Date();
      const chosen = y * 12 + (m - 1);
      const current = now.getFullYear() * 12 + now.getMonth();
      if (chosen < current) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['date'], message: 'That month has already passed.' });
      if (chosen > current + 60) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['date'], message: 'Please choose a date within the next five years.' });
    }
  });

export const plannerPackSchema = z.object({
  name,
  company: z.string().trim().min(2, 'Please enter your company.').max(120),
  email,
  whatsapp: phone,
  upcoming: text(300).optional().default(''),
  website: honeypot
});

/** Turn a ZodError into { field: message } for the client. */
export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
