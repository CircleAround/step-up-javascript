let count1 = 0;
let count2 = 0;

const logEl = document.querySelector('#output');

function log(text) {
  logEl.innerHTML = `${logEl.innerHTML }<br>${text}`;
}

document.querySelector('#button1').addEventListener('click', () => {
  log('>>> 1開始');

  for(let i = 0; i < 10000; i++) {
    console.debug(i);
  }

  log(`button1: ${count1++}`);
  log('<<< 1終了');
});

document.querySelector('#button2').addEventListener('click', () => {
  log('>>> 2開始');

  for(let i = 0; i < 10000; i++) {
    console.debug(i);
  }

  log(`button2: ${count2++}`);
  log('<<< 2終了');
});

