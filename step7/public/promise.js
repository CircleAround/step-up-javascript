console.log("fetchの動作サンプル");
fetch('./user.json').then(function(res){ // [1]
  return res.json(); // [2]
}).then(function(user){
  console.log(user); // [3]
}).catch(function(err){
  console.error(err); // [4]
});

console.log('fetchJson');
function fetchJson(url) {
  return fetch(url).then(function(res){
    return res.json();
  });
}

fetchJson('./user.json').then(function(user){
  console.log(user); // [1]
}).catch(function(err){
  console.error(err); // [2]
});

console.log("Promise");
let entry;
fetchJson('./user.json').then(function(user){
  console.log(user);
  return fetchJson(`./users/${user.id}/entries.json`);
}).then(function(entries){
  console.log("エントリ一覧を取得しました");
  entry = entries[0];
  return fetchJson(`./entries/${entry.id}/comments.json`);
}).then(function(comments) {
  console.log(`エントリとコメントを取得:${entry.name}`);
  comments.forEach(function(comment){
    console.log(`${comment.id}: ${comment.comment}`);
  });
}).catch(function(err){
  alert(`通信に失敗しました: ${err.message}`);
});

async function getComments() {
  try {
    const user = await fetchJson('./user.json');
    console.log(user);

    const entries = await fetchJson(`./users/${user.id}/entries.json`);
    console.log("エントリ一覧を取得しました");
    
    const entry = entries[0];
    const comments = await fetchJson(`./entries/${entry.id}/comments.json`);
    console.log(`エントリとコメントを取得:${entry.name}`);
    
    comments.forEach(function(comment){
      console.log(`${comment.id}: ${comment.comment}`);
    });  
  } catch(err) {
    alert(`通信に失敗しました: ${err.message}`);
  }
}

getComments();

// --------------
async function myAsyncFunc() {
  return "myAsyncFuncの戻り値";
}

myAsyncFunc().then(function(value) { // [1]
  console.log(value);
});

function myAsyncFuncInternal() {
  return new Promise(function(resolve) {
    resolve("myAsyncFuncの戻り値");
  });
}

myAsyncFuncInternal().then(function(value) {
  console.log(value);
});


function myPromiseFunc() {
  return new Promise(function(resolve) {
    resolve('myPromiseFuncの戻り値');
  });
}

async function callPromiseFunc() {
  const ret = await myPromiseFunc();
  console.log(ret);
  return ret;
}

callPromiseFunc();

// --------------
const promises = [
  fetchJson('./entries/3/comments.json'),
  fetchJson('./entries/4/comments.json')
];

Promise.all(promises).then((comments)=>{
  console.log(comments);
});


// --------------
function getJsonAsPromise(url) {
  return new Promise(function(resolve, reject){ // [1]
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText)); // [2]
      } else {
        reject(new Error(xhr.statusText)); // [3]
      }
    };
    xhr.onerror = function() {
      reject(new Error('通信に失敗しました')); // [4]
    };
    xhr.send(null);
  });
}

getJsonAsPromise('./user.json').then((user)=>{
  console.log("getJsonAsPromise");
  console.log(user);
});

async function myProcess() {
  const user = await getJsonAsPromise('./user.json');
  console.log(user);
}

myProcess();