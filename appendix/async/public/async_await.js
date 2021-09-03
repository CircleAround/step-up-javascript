function fetchJson(url) {
  return fetch(url).then(function(res){
    return res.json();
  });
}

async function getComments() {
  try {
    const user = await fetchJson('./user.json');
    console.log(user);

    const entries = await fetchJson(`./users/${user.id}/entries.json`);
    console.log("エントリ一覧を取得しました");
    
    const entry = entries[0];
    const comments = await fetchJson(`./entries/${entry.id}/comments.json`);
    console.log(`エントリとコメントを取得:${entry.name}`);
    for(const comment of comments) {
      console.log(`${comment.id}: ${comment.comment}`);
    }
  } catch(err) {
    alert(`通信に失敗しました: ${err.message}`);
  }
}

console.log("async/await");
getComments();
