import { HostApplicationSubmissionError, hostApplicationInputSchema, hostApplicationReceiptSchema, type HostApplicationInput, type HostApplicationReceipt, type HostApplicationRepository } from "./host-application-contract";

function apiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new HostApplicationSubmissionError("unavailable");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoHostApplicationRepository implements HostApplicationRepository {
  async submit(input: HostApplicationInput): Promise<HostApplicationReceipt> {
    const payload = hostApplicationInputSchema.parse(input);
    const url = new URL("api/v1/host-applications/", apiBaseUrl());
    let response: Response;
    try {
      response = await fetch(url, { method: "POST", credentials: "include", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {
      throw new HostApplicationSubmissionError("unavailable");
    }
    if (response.status === 400 || response.status === 422) throw new HostApplicationSubmissionError("validation");
    if (response.status === 429) throw new HostApplicationSubmissionError("rate_limited");
    if (!response.ok) throw new HostApplicationSubmissionError("unavailable");
    try {
      return hostApplicationReceiptSchema.parse(await response.json());
    } catch {
      throw new HostApplicationSubmissionError("invalid_response");
    }
  }
}
