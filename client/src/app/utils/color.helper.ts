export function stringToHexColor(input: string): string {
  // Simple hash function to convert string to a numeric value
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Ensure the value is positive
  hash = Math.abs(hash);

  // Generate hex color using the numeric value
  const hexColor = '#' + (hash % 0xFFFFFF).toString(16).padStart(6, '0');

  return hexColor;
}