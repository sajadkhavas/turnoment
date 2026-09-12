import { z } from "zod";

const fieldText = (label: string, min: number, max: number) =>
  z.string().trim().min(min, `${label} را کامل وارد کنید.`).max(max, `${label} بیش از حد طولانی است.`);

const digitMap: Record<string, string> = {
  "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

export function normalizeHostApplicationDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => digitMap[digit] ?? digit);
}

function normalizeIranianMobile(value: string): string {
  const normalized = normalizeHostApplicationDigits(value).replace(/[\s()-]/g, "");
  if (/^09\d{9}$/.test(normalized)) return `+98${normalized.slice(1)}`;
  if (/^989\d{9}$/.test(normalized)) return `+${normalized}`;
  return normalized;
}

export const hostApplicationDraftSchema = z.object({
  venueName: z.string(), managerName: z.string(), phone: z.string(), city: z.string(), area: z.string(), stationCount: z.string(), games: z.string(), description: z.string(),
}).strict();

export type HostApplicationDraft = z.infer<typeof hostApplicationDraftSchema>;
export type HostApplicationField = keyof HostApplicationDraft;
export type HostApplicationFieldErrors = Partial<Record<HostApplicationField, string>>;

const hostApplicationDraftSubmissionSchema = z.object({
  venueName: fieldText("نام مرکز", 2, 120),
  managerName: fieldText("نام مدیر یا مسئول", 2, 120),
  phone: z.string().trim().transform(normalizeIranianMobile).refine((value) => /^\+989\d{9}$/.test(value), { message: "شماره تماس را به‌صورت یک شماره موبایل معتبر وارد کنید." }),
  city: fieldText("شهر", 2, 80),
  area: fieldText("منطقه یا محدوده", 2, 120),
  stationCount: z.string().trim().transform(normalizeHostApplicationDigits).refine((value) => /^\d+$/.test(value), { message: "تعداد سیستم یا کنسول را با عدد وارد کنید." }).transform(Number).refine((value) => Number.isSafeInteger(value) && value >= 1 && value <= 1000, { message: "تعداد سیستم یا کنسول باید بین ۱ تا ۱۰۰۰ باشد." }),
  games: fieldText("بازی‌های قابل میزبانی", 2, 300),
  description: z.string().trim().max(1200, "توضیحات تکمیلی بیش از حد طولانی است.").transform((value) => value.length ? value : null),
}).strict();

export const hostApplicationInputSchema = z.object({
  venueName: z.string().trim().min(2).max(120),
  managerName: z.string().trim().min(2).max(120),
  phone: z.string().regex(/^\+989\d{9}$/),
  city: z.string().trim().min(2).max(80),
  area: z.string().trim().min(2).max(120),
  stationCount: z.number().int().min(1).max(1000),
  games: z.string().trim().min(2).max(300),
  description: z.string().trim().min(1).max(1200).nullable(),
}).strict();

export type HostApplicationInput = z.infer<typeof hostApplicationInputSchema>;

export const hostApplicationReceiptSchema = z.object({
  schemaVersion: z.literal(1),
  applicationId: z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/),
  state: z.literal("received"),
  submittedAt: z.string().datetime({ offset: true }),
}).strict();

export type HostApplicationReceipt = z.infer<typeof hostApplicationReceiptSchema>;
export type HostApplicationValidationResult = { success: true; data: HostApplicationInput } | { success: false; fieldErrors: HostApplicationFieldErrors };

export function validateHostApplicationDraft(draft: HostApplicationDraft): HostApplicationValidationResult {
  const result = hostApplicationDraftSubmissionSchema.safeParse(draft);
  if (result.success) return { success: true, data: hostApplicationInputSchema.parse(result.data) };
  const fieldErrors: HostApplicationFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || !(field in draft)) continue;
    const key = field as HostApplicationField;
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { success: false, fieldErrors };
}

export type HostApplicationSubmissionErrorCode = "validation" | "rate_limited" | "unavailable" | "invalid_response";
export class HostApplicationSubmissionError extends Error {
  readonly code: HostApplicationSubmissionErrorCode;
  constructor(code: HostApplicationSubmissionErrorCode) {
    super(`Host application submission failed: ${code}`);
    this.name = "HostApplicationSubmissionError";
    this.code = code;
  }
}

export interface HostApplicationRepository {
  submit(input: HostApplicationInput): Promise<HostApplicationReceipt>;
}
