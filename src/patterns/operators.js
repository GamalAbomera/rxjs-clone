export function map(callback) {
  return callback;
}
export function filter(callback) {
  return (value) => {
    const val = callback(value);
    return val ? value : false;
  };
}
