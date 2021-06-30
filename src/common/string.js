// x-button => xButton
export function camelCase(input) {
  return input.toLowerCase().replace(/-(.)/g, function (_match, group1) {
    return group1.toUpperCase();
  });
}

export function uniqueId() {
  return new Date().getTime();
}
