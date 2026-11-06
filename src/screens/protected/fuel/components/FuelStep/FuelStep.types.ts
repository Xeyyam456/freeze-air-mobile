import type { StepKind } from "@typings/fuel";

export type FuelStepProps = {
  kind: StepKind;
  value: number | null; // yazılmış km
  photo: string | null; // storage yolu və ya yerli fayl (optimistik)
  at: string | null;
  min?: number; // axşam: səhər km-indən az olmaz
  max?: number; // səhər: axşam km-indən çox olmaz
  disabled?: boolean;
  onSave: (km: number, uri: string | null) => void;
};
