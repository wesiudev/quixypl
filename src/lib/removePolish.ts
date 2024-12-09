export default function removePolishSignsAndSpaces(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s.-]/g, "");
}
