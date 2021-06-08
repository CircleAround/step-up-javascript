/*
eslint no-unused-vars: 0
*/

function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${sec}秒たちました`);
      // もしも失敗する時には以下のように呼ぶと失敗を知らせられる
      //reject(new Error('エラーです'));
    }, sec * 1000);
  });
}

wait(3).then((msg) => {
  // ここは3秒後にコールされます
  console.log(msg); // => 3秒たちました
}).catch((err) => {
  console.log(err.message);
});


async function wait3sec() {
  const msg = await wait(3);
  // 3秒後に下記が実行される
  console.log(msg); // => 3秒たちました
}

wait3sec();


async function waitMultiple() {
  const promises = [
    wait(3), // [1]
    wait(5) // [2]
  ];
  
  const messages = await Promise.all(promises);
  console.log(messages); // [3]
}

waitMultiple();