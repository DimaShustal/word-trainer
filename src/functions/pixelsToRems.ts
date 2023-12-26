/**
 * Base font size in pixels on 1600px wide screen.
 */
const BASE_FONT_SIZE = 20;

export function pixelsToRems(size: number): string {
  return `${size / BASE_FONT_SIZE}rem`;
}
