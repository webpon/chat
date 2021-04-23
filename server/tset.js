function encryption (Plaintext) {
  let PlaintextArr = Plaintext.split('').map(char=>char.charCodeAt())
  let PlaintextCharCode = PlaintextArr.join('')
  
  return Math.sin(PlaintextCharCode).toString().split('.')[1].slice(0,16)
}
console.log(encryption('12345'));