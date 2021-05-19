{
  function fetchHello() {
    const promise = fetch('./hello.json');

    const onFulfilled = (data) => {
      console.log('通信成功しました');
    };

    const onRejected = (err) => {
      console.log('通信失敗しました');
    };
    return promise.then(onFulfilled, onRejected);
  }

  fetchHello();
}

{
  function fetchHello() {
    return fetch('./hello.json').then((data) => {
      console.log('通信成功しました');
    }, (err) => {
      console.log('通信失敗しました');
    });
  }

  fetchHello();
}

{
  function displayMessagePromise() {
    return fetch('./hello.json').then((response) => { // [1]
      return response.json();
    }).then((data) => { // [2]
      const messageElm = document.getElementById('message');
      messageElm.innerHTML = data.message;
      console.log('終了');
    });
  }

  displayMessagePromise().then(() => {
    console.log('displayMessagePromiseが終わりました');
  });
}

{
  function displayMessagePromise() {
    return fetch('./hello.json').then((response) => { // [1]
      return response.json(); // [2]
    }).then((data) => {
      const messageElm = document.getElementById('message'); // [3] 〜
      messageElm.innerHTML = data.message;
      // 例えば以下のように例外が発生してもcatch関数で捕まえられる
      // throw new Error("テストエラー");
      console.log('終了'); // 〜 [3]
    }).catch((err) => { // [4]
      console.log(`displayMessagePromiseの処理中にエラーが発生しました: ${err.message}`);
    });
  }

  displayMessagePromise().then(() => {
    console.log('displayMessagePromiseが終わりました');
  });
}

{
  async function displayMessage() {
    try {
      const response = await fetch('./hello.json');
      const data = await response.json();
      const messageElm = document.getElementById('message');
      messageElm.innerHTML = data.message;
      console.log('終了');
    } catch (err) {
      console.log(`displayMessageの処理中にエラーが発生しました: ${err.message}`);
    }
  }

  displayMessage().then(() => {
    console.log('displayMessageが終わりました');
  });
}