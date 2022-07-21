import "./styles.css";
import React, { useState } from "react";

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export function App() {
  const [todoText, setTodoText] = useState("");
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  // 機能
  const onChangeInput = (e) => {
    setTodoText(e.target.value);
  };
  // タスクの追加
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText("");
  };
  // タスクの削除
  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  };
  // タスクの完了
  const onClickComplete = (index) => {
    const newTodos = [...completeTodos, inCompleteTodos[index]];
    const newIncompleteTodos = [...inCompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newTodos);
  };
  // タスクの戻す
  const onClickBack = (index) => {
    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]];
    const newTodos = [...completeTodos];
    newTodos.splice(index, 1);

    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newTodos);
  };
  const inCompleteTodosDisabled = inCompleteTodos.length >= 5;
  // render
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeInput}
        onClick={onClickAdd}
        disabled={inCompleteTodosDisabled}
      />
      {/* 未完了 */}
      {inCompleteTodosDisabled && (
        <p style={{ color: "red" }}>登録できるtodoは5個まで！消化して！</p>
      )}

      <IncompleteTodo
        inCompleteTodos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {/* 完了 */}
      <CompleteTodo completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
}
