import type { Person, PersonStatus } from "@typings/team";

export type PersonCardProps = {
  person: Person;
  subtitle: string;
  badge?: string; // "Sən"
  status?: PersonStatus;
  stats?: { label: string; value: number }[];
  onPress: (person: Person) => void;
};
