

async function displayMessage() {
  const response = await fetch('./hello.json');
  const data = await response.json();
  const messageElm = document.getElementById('message');
  messageElm.innerHTML = data.message;
}

displayMessage();