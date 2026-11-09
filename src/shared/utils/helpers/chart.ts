// Hamar xətt (Catmull-Rom → Bezier) SVG path-i: nöqtələr [x, y]; area=true olanda altı bağlanır (qradiyent dolğu üçün)
export function smoothPath(points: [number, number][], bottom: number, area = false) {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  let d = `M${x0},${y0}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  if (!area) return d;
  const last = points[points.length - 1];
  return `${d} L${last[0]},${bottom} L${x0},${bottom} Z`;
}
