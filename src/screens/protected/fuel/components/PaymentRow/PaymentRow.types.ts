import type { FuelPayment } from "@typings/fuel";

export type PaymentRowProps = { payment: FuelPayment; onConfirm: (id: number, received: boolean) => void };
