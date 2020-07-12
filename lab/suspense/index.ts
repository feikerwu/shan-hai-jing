function suspense(fn: Function, fallback: Function = () => {}) {
  try {
    fn();
  } catch (e) {
    if (e.then) {
      e.then(() => suspense(fn, fallback));
      return fallback();
    }
  }
}

function createAsyncFactory() {
  let cache: Map<Function, any> = new Map();
  return (fn: Function) => {
    if (cache.has(fn)) {
      return cache.get(fn);
    } else {
      throw fn();
    }
  };
}

let async = createAsyncFactory();

suspense;
