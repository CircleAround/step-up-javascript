'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  console.log('クラスを使ってるよ');
};

var func = function func() {
  console.log('アロー関数を使ってるよ');
};

new App();
func();
