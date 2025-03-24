import {
  hexToRgb,
  rgbToHex,
  getContrastRatio,
  isLightColor,
  adjustBrightness
} from '../colorUtils';

describe('colorUtils', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex to RGB', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('converts 3-digit hex to RGB', () => {
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0F0')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#00F')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('works with or without # prefix', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('F00')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('returns null for invalid hex values', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#XYZ')).toBeNull();
      expect(hexToRgb('#12')).toBeNull();
      expect(hexToRgb('#12345')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('converts RGB to hex', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });

    it('handles intermediate values', () => {
      expect(rgbToHex(128, 128, 128)).toBe('#808080');
      expect(rgbToHex(85, 170, 255)).toBe('#55aaff');
    });
  });

  describe('getContrastRatio', () => {
    it('calculates contrast ratio between colors', () => {
      // White and black have the maximum contrast ratio of 21:1
      expect(getContrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 0);
      
      // Same colors have a contrast ratio of 1:1
      expect(getContrastRatio('#FF0000', '#FF0000')).toBeCloseTo(1, 0);
      
      // Test some other combinations
      expect(getContrastRatio('#FFFFFF', '#808080')).toBeGreaterThan(1);
      expect(getContrastRatio('#000000', '#808080')).toBeGreaterThan(1);
    });

    it('throws error for invalid colors', () => {
      expect(() => getContrastRatio('#FFFFFF', 'invalid')).toThrow();
      expect(() => getContrastRatio('invalid', '#000000')).toThrow();
    });
  });

  describe('isLightColor', () => {
    it('identifies light colors correctly', () => {
      expect(isLightColor('#FFFFFF')).toBe(true);
      expect(isLightColor('#FFFF00')).toBe(true);
      expect(isLightColor('#00FFFF')).toBe(true);
      expect(isLightColor('#FFCCCC')).toBe(true);
    });

    it('identifies dark colors correctly', () => {
      expect(isLightColor('#000000')).toBe(false);
      expect(isLightColor('#800000')).toBe(false);
      expect(isLightColor('#008000')).toBe(false);
      expect(isLightColor('#000080')).toBe(false);
      expect(isLightColor('#404040')).toBe(false);
    });

    it('throws error for invalid colors', () => {
      expect(() => isLightColor('invalid')).toThrow();
    });
  });

  describe('adjustBrightness', () => {
    it('increases brightness correctly', () => {
      // Doubling brightness of black still gives black
      expect(adjustBrightness('#000000', 2)).toBe('#000000');
      
      // Doubling brightness of dark gray gives light gray
      expect(adjustBrightness('#808080', 2)).toBe('#ffffff');
      
      // Increasing brightness of red
      expect(adjustBrightness('#800000', 1.5)).toBe('#c00000');
    });

    it('decreases brightness correctly', () => {
      // Halving brightness of white gives gray
      expect(adjustBrightness('#FFFFFF', 0.5)).toBe('#808080');
      
      // Halving brightness of red
      expect(adjustBrightness('#FF0000', 0.5)).toBe('#800000');
    });

    it('clamps values to valid RGB range', () => {
      // Increasing brightness of white should still be white
      expect(adjustBrightness('#FFFFFF', 1.5)).toBe('#ffffff');
      
      // Decreasing brightness of black should still be black
      expect(adjustBrightness('#000000', 0.5)).toBe('#000000');
    });

    it('throws error for invalid colors', () => {
      expect(() => adjustBrightness('invalid', 1.5)).toThrow();
    });
  });
});