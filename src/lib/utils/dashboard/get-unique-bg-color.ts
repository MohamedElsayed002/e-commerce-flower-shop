export function getUniqueBgColor(userId?: string): string {
  const userIdentifier: string = userId || Math.random().toString();
  let hashValue: number = 0;

  for (let i = 0; i < userIdentifier.length; i++) {
    hashValue += userIdentifier.charCodeAt(i);
  }

  const hueValue: number = hashValue % 360;
  const saturationValue: number = 70;
  const lightnessValue: number = 50;

  return `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
}
