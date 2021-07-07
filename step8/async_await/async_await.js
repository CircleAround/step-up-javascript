async function displayMessage() {
  const response = await fetch('./hello.json');
  const data = await response.json();
  const messageElm = document.getElementById('message');
  messageElm.innerHTML = data.message;
  console.log('終了'); // [1]
}

console.log('開始前'); // [2]
displayMessage();
console.log('開始後'); // [3]
