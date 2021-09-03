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
  for (const comment of comments) {
    console.log(`${comment.id}: ${comment.comment}`);
  }
}).catch(function(err){
  alert(`通信に失敗しました: ${err.message}`);
});
