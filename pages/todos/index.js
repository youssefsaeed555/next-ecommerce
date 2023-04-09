import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export async function getStaticProps() {
  const readData = await fs.readFile(
    path.join(process.cwd(), "data", "data.json")
  );
  const data = JSON.parse(readData);

  return {
    props: {
      todos: data,
    },
    revalidate: 20,
  };
}

function index({ todos }) {
  return (
    <>
      <h1>my todos</h1>
      <ul>
        {todos?.map((todo, idx) => (
          <li key={idx}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default index;
