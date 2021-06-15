async function displayMessage() { // --- [1]
  const response = await fetch('./hello.json'); // --- [2]
  const data = await response.json(); // --- [3]
  const messageElm = document.getElementById('message');
  messageElm.innerHTML = data.message; // --- [4]
}

displayMessage();