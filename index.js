let n = 9470;

let i = n;

while (i > 0) {
  let lastD = i % 10; //9470% 10 = remainder  0
  console.log(lastD);
  i = Math.floor(i / 10); //Math.floor decimal value ko convert kar deta hai intege
}
