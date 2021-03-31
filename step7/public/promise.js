console.log("fetchの動作サンプル");
fetch('./user.json').then(function(res){
  return res.json();
}).then(function(user){
  console.log(user); // [1]
}).catch(function(err){
  console.error(err); // [2]
});

console.log("Promise");
fetch('./user.json').then(function(res){
  return res.json();
}).then(function(user){
  console.log(user); // [2]
  return fetch(`./users/${user.id}/entries.json`);
}).then(function(res){
  return res.json();
}).then(function(entries){
  console.log("エントリ一覧を取得しました");
  entries.forEach(function(entry) {
    fetch(`./entries/${entry.id}/comments.json`).then(function(res){
      return res.json();
    }).then(function(comments) {
      console.log(`エントリとコメントを取得:${entry.name}`);
      comments.forEach(function(comment){
        console.log(`${comment.id}: ${comment.comment}`);
      });
    });
  });
}).catch(function(err){
  alert(`通信に失敗しました: ${err.message}`);
});
