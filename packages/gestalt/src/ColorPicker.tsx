import { useState, useEffect, useRef, ReactElement } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Flex from './Flex';
import Text from './Text';
import TextField from './TextField';
import { hexToRgb, rgbToHex, isLightColor } from './utils/colorUtils';

type Props = {
  /**
   * Initial color value in hex format (e.g. "#FF0000")
   */
  initialColor?: string;
  /**
   * Callback when color is changed
   */
  onChange?: (color: string) => void;
  /**
   * Available for testing purposes, if needed
   */
  dataTestId?: string;
  /**
   * Disable the color picker
   */
  disabled?: boolean;
  /**
   * Label for the color picker
   */
  label?: string;
  /**
   * Helper text to display below the color picker
   */
  helperText?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
};

/**
 * ColorPicker is a component that allows users to select a color.
 * It provides a color swatch and hex input field.
 */
export default function ColorPicker({
  initialColor = '#000000',
  onChange,
  dataTestId,
  disabled = false,
  label = 'Color',
  helperText,
  errorMessage,
}: Props): ReactElement {
  const [color, setColor] = useState(initialColor);
  const [hexValue, setHexValue] = useState(initialColor.replace('#', ''));
  const [isValid, setIsValid] = useState(true);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Validate initial color
    const isValidHex = /^#?([0-9A-F]{3}){1,2}$/i.test(initialColor);
    setIsValid(isValidHex);
    
    if (isValidHex) {
      setColor(initialColor.startsWith('#') ? initialColor : `#${initialColor}`);
      setHexValue(initialColor.replace('#', ''));
    }
  }, [initialColor]);

  const handleHexChange = (value: string) => {
    setHexValue(value);
    
    // Validate hex value
    const hexRegex = /^([0-9A-F]{3}){1,2}$/i;
    const isValidHex = hexRegex.test(value);
    
    setIsValid(isValidHex);
    
    if (isValidHex) {
      const newColor = `#${value}`;
      setColor(newColor);
      onChange?.(newColor);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setHexValue(newColor.replace('#', ''));
    setIsValid(true);
    onChange?.(newColor);
  };

  const textColor = isLightColor(color) ? '#000000' : '#FFFFFF';

  return (
    <Box data-test-id={dataTestId}>
      <Flex direction="column" gap={2}>
        {label && (
          <Text size="300" weight="bold">
            {label}
          </Text>
        )}
        
        <Flex gap={2} alignItems="center">
          {/* Color swatch */}
          <Box 
            color="white" 
            rounding={2} 
            borderStyle="sm"
            dangerouslySetInlineStyle={{
              __style: {
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
              },
            }}
            onClick={() => {
              if (!disabled && colorInputRef.current) {
                colorInputRef.current.click();
              }
            }}
          >
            <Box 
              width={48} 
              height={48} 
              rounding={1}
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: color,
                },
              }}
            >
              <Flex alignItems="center" justifyContent="center" height="100%">
                <input
                  ref={colorInputRef}
                  type="color"
                  value={color}
                  onChange={handleColorPickerChange}
                  disabled={disabled}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                />
              </Flex>
            </Box>
          </Box>
          
          {/* Hex input */}
          <Box maxWidth={120}>
            <TextField
              id="color-hex-input"
              onChange={({ value }) => handleHexChange(value)}
              value={hexValue}
              placeholder="Hex"
              prefix="#"
              disabled={disabled}
              errorMessage={!isValid ? 'Invalid hex' : errorMessage}
            />
          </Box>
        </Flex>
        
        {helperText && !errorMessage && isValid && (
          <Text size="200" color="subtle">
            {helperText}
          </Text>
        )}
      </Flex>
    </Box>
  );
}