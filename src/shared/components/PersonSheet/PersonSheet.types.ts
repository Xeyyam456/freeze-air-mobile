import type { Person, PersonStatus } from "@typings/team";

export type PersonSheetProps = {
  person: Person;
  subtitle: string;
  status?: PersonStatus; // yalnız ustalar: bugünkü vəziyyət
  stats?: { label: string; value: number }[]; // yalnız ustalar: bu gün/ay iş sayı
  onClose: () => void;
};
