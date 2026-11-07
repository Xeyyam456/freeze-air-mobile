import type { Person } from "@typings/team";

export type LeadCardProps = { person: Person; onPress: (person: Person) => void };
