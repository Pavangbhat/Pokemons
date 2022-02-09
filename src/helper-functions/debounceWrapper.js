const debounceWrapper = (fn, ms) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

export default debounceWrapper;
