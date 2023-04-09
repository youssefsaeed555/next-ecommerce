import { useRouter } from "next/router";
import React from "react";
import fs from "fs/promises";
import path from "path";

const SingleTodo = ({ todo }) => {
  console.log(todo);
  return <div>the todo is :{todo?.title} </div>;
};

export async function getStaticProps(context) {
  console.log(context);
  const { todoId } = context.params;
  const readData = await fs.readFile(
    path.join(process.cwd(), "data", "data.json")
  );
  const data = JSON.parse(readData);
  const todo = data.find((todo) => todo.id.toString() === todoId.toString());
  if (!todo) {
    return {
      notFound: true,
    };
  }
  if (!todo.title) {
    return {
      redirect: { destination: "/todos" },
    };
  }
  return {
    props: {
      todo: todo,
    },
  };
}

export async function getStaticPaths() {
  const readData = await fs.readFile(
    path.join(process.cwd(), "data", "data.json")
  );
  const data = JSON.parse(readData);
  const ids = data.map((todo) => {
    return { params: { todoId: todo.id.toString() } };
  });
  console.log(ids);
  return {
    paths: ids,
    fallback: true,
  };
}

export default SingleTodo;
