/**
 * Utility functions for color manipulation and conversion
 */

/**
 * Converts a hex color code to RGB values
 * @param hex - Hex color code (e.g. "#FF0000" or "#F00")
 * @returns Object with r, g, b values or null if invalid input
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Handle shorthand hex (e.g. #F00)
  const normalizedHex = cleanHex.length === 3 
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;
    
  // Parse the hex values
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
  
  return result 
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Converts RGB values to a hex color code
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color code (e.g. "#FF0000")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format');
  }
  
  // Calculate luminance for the first color
  const luminance1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  
  // Calculate luminance for the second color
  const luminance2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  // Calculate contrast ratio
  const ratio = luminance1 > luminance2 
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
    
  return parseFloat(ratio.toFixed(2));
}

/**
 * Calculates the relative luminance of a color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance value
 */
function calculateLuminance(r: number, g: number, b: number): number {
  // Normalize RGB values
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;
  
  // Calculate RGB values
  const R = normalizedR <= 0.03928 
    ? normalizedR / 12.92 
    : Math.pow((normalizedR + 0.055) / 1.055, 2.4);
    
  const G = normalizedG <= 0.03928 
    ? normalizedG / 12.92 
    : Math.pow((normalizedG + 0.055) / 1.055, 2.4);
    
  const B = normalizedB <= 0.03928 
    ? normalizedB / 12.92 
    : Math.pow((normalizedB + 0.055) / 1.055, 2.4);
  
  // Calculate luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Determines if a color is light or dark
 * @param hexColor - Hex color code
 * @returns Boolean indicating if the color is light (true) or dark (false)
 */
export function isLightColor(hexColor: string): boolean {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    throw new Error('Invalid color format');
  }
  
  // Calculate luminance
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
  
  // Colors with luminance > 0.5 are considered light
  return luminance > 0.5;
}

/**
 * Adjusts the brightness of a color
 * @param hexColor - Hex color code
 * @param factor - Factor to adjust brightness (0-2, where 1 is no change)
 * @returns Adjusted hex color
 */
export function adjustBrightness(hexColor: string, factor: number): string {
  const rgb = hexToRgb(hexColor);
  
  if (!rgb) {
    throw new Error('Invalid color format');
  }
  
  // Adjust RGB values
  const r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
  const g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
  const b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
  
  return rgbToHex(r, g, b);
}