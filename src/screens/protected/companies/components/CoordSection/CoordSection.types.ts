import type usePlaceLocation from "@screens/protected/companies/hooks/usePlaceLocation";
import type { PlaceRef } from "@typings/companies";

export type CoordSectionProps = { place: PlaceRef; loc: ReturnType<typeof usePlaceLocation> };
