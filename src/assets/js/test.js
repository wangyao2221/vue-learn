function test (a, b, op) {
  return op(a, b)
}

console.log(test(1, 2, (a, b) => a + b))
