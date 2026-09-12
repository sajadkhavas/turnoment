import { hostApplicationInputSchema, hostApplicationReceiptSchema, type HostApplicationInput, type HostApplicationReceipt, type HostApplicationRepository } from "./host-application-contract";

const FIXTURE_RECEIPT = hostApplicationReceiptSchema.parse({
  schemaVersion: 1,
  applicationId: "host-application-fixture-001",
  state: "received",
  submittedAt: "2026-09-12T15:00:00+03:30",
});

export class MockHostApplicationRepository implements HostApplicationRepository {
  async submit(input: HostApplicationInput): Promise<HostApplicationReceipt> {
    hostApplicationInputSchema.parse(input);
    return FIXTURE_RECEIPT;
  }
}
