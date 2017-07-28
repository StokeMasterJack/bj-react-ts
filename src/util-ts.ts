export function f2(x: number, y: number, { a, b }: Obj) {
  console.log(x + y + a + b);
}

interface Obj {
  a: number;
  b: number;
}
