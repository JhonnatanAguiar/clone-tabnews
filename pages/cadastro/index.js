import { useState } from "react";

export default function RegisterPage() {
  console.log("Render do <RegisterPage>");

  const [newCount, setNewCount] = useState(0);

  let count = 0;
  console.log(`count do render: ${count}`);
  console.log(`newCount do render: ${newCount}`);

  function increment() {
    console.log(`Count dentro de increment(): ${count}`);
    count += 1;
  }

  function newIncrement() {
    console.log(`Count dentro de newIncrement(): ${newCount}`);
    setNewCount(newCount + 1);
  }

  return (
    <>
      <h1>Count: ${count}</h1>
      <button onClick={increment}>Incrementar</button>

      <hr />

      <h1>newCount: ${newCount}</h1>
      <button onClick={newIncrement}>Incrementar novo</button>
    </>
  );
}
