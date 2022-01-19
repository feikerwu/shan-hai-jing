// interface Func1 {
//   (): void;
// }

type Func2 = () => void;
type Func1 = {
  (): void;
};

let a: Func1 = () => {};
