export function choice(arr: any[]) {
  const idx = Math.trunc(Math.random() * arr.length);
  return arr[idx];
}
