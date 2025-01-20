export function getThreeWords(title: string) {
  return title.split(' ').slice(0, 3).join(' ');
}