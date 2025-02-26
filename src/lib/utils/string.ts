export function getTwoWords(title: string) {
  return title.split(' ').slice(0, 2).join(' ');
}