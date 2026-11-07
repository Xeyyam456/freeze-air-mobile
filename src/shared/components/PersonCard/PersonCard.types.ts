import type { Person, PersonStatus } from "@typings/team";

export type PersonCardProps = {
  person: Person;
  subtitle: string;
  badge?: string; // "Sən"
  highlight?: boolean; // öz kartım: mavi çərçivə
  status?: PersonStatus;
  partners?: string[]; // bu günkü qrup tərəfdaşları
  stats?: { label: string; value: number }[];
  onPress: (person: Person) => void;
};
