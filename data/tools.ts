/**
 * Tools shown as chips in the Tools section. `level` (0–100) drives a subtle
 * proficiency bar and comes from Noor's CV "Software Skills".
 *
 * TODO: drop in real brand SVG logos in /public/tools/<id>.svg and render them
 * in the Tools section instead of the letter avatar.
 */

export interface Tool {
  id: string;
  name: string;
  role: string;
  level: number;
}

export const tools: Tool[] = [
  { id: "figma", name: "Figma", role: "Primary design & prototyping", level: 95 },
  { id: "adobe-xd", name: "Adobe XD", role: "UI design & prototyping", level: 95 },
  { id: "figjam", name: "FigJam", role: "Workshops & flow mapping", level: 85 }, // TODO: confirm level
  { id: "illustrator", name: "Adobe Illustrator", role: "Icons & vector art", level: 65 },
  { id: "photoshop", name: "Adobe Photoshop", role: "Image editing & assets", level: 50 },
];
