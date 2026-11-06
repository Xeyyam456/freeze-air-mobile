import type { ComponentType, ReactNode } from "react";

// Bütün ikonlar eyni props alır (24×24 viewBox, xətt ikonları)
export type IconProps = { size?: number; color?: string; strokeWidth?: number };

// Komponentlərə ikon ötürmək üçün tip (Button, Card, TabBar...)
export type Icon = ComponentType<IconProps>;

export type IconBaseProps = IconProps & { children: ReactNode };
