function getJson(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(xhr.statusText));
    }
  };
  xhr.onerror = function() {
    callback(new Error('通信に失敗しました'));
  };
  xhr.send(null);
}

console.log("getJsonの動作サンプル");
getJson('./user.json', function(err, user){
  if(err) {
    console.error(err); // [1]
  } else {
    console.log(user); // [2]
  }
});

console.log("Callback Hell");
getJson('./user.json', function(err, user) { // [1]
  if(err) { 
    return alert(`ユーザが取得できません: ${err.message}`);
  }

  getJson(`./users/${user.id}/entries.json`, function(err, entries){ // [2]
    if(err) { 
      return alert(`エントリ一覧が取得できません: ${err.message}`);
    }

    console.log("エントリ一覧を取得しました");
    console.log(entries);
    entries.forEach(function(entry) {
      getJson(`./entries/${entry.id}/comments.json`, function(err, comments){ // [3]
        if(err) { 
          return alert(`コメント一覧が取得できません: ${err.message}`);
        }

        console.log(`エントリとコメントを取得:${entry.name}`);
        comments.forEach(function(comment){
          console.log(`${comment.id}: ${comment.comment}`);
        });
      });
    });
  });

  console.log("エントリのJSONを取得した後に呼ばれそうに思いますが、取得する前に到達します");
});


