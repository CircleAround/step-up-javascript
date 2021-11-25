function displayName(name) {
  if(!name) { 
    throw new Error('name is required');
  }

  console.log(`名前は${name}です`);
}

try {
  displayName();
} catch(e) {
  console.error(`名前表示に失敗しました: ${e.message}`);
}



class InputError extends Error {}

function share(input) {
  const value = parseInt(input);
  if(!Number.isInteger(value)) {
    throw new InputError('入力値が不正です'); // [1]
  }
  if(value < 0) {
    throw new InputError('正の数で入力してください');
  }
  return divide(100, value);
}

function divide(lhv, rhv) {
  if(rhv === 0) {
    throw new Error('0では演算できません'); // [2]
  }
  return lhv / rhv;
}

try {
  const input = prompt('100円を分ける人数を入力してください', 1);
  const result = share(input);
  alert(`1人分は${result}円です`);
} catch(e) {
  if(e instanceof InputError) {
    alert('入力値は正の整数を入れてください。リロードします');
    location.reload();
  } else if(e instanceof Error) {
    console.error(e);
    alert('予期しないエラーが発生しました。終了します');
  }
}