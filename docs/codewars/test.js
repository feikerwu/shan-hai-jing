function openOrSenior(data) {
  return data.map(([a, b]) => (a >= 55 && b > 7 ? 'Senior' : 'Open'));
}
