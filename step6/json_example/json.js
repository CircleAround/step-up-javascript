{
  const jsonStr = JSON.stringify({
    name: "田中太郎",
    age: 25,
    interest: ["プログラミング", "料理", "読書"]
  });
  console.log(jsonStr);  
}

{
  const jsonStr = JSON.stringify({
    "name": "田中太郎",
    "age": 25,
    "interest": ["プログラミング", "料理", "読書"]
  });
  console.log(jsonStr);
  const obj = JSON.parse(jsonStr); // ---[1]
  console.log(obj.name); // ---[2]
}