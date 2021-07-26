import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

import { useReduxDispatch } from "../../../helpers";
import { fetchTodo, setPage } from "../todoList.actions";
import { getTodoList } from "../todoList.selectors";

export default function TodoContainer(): ReactElement {
  const { todos, loading, error, page, itemsLimit } = useSelector(getTodoList)

  const dispatch = useReduxDispatch();

  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(fetchTodo(page, itemsLimit));
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangePage = (page: any) => {
    dispatch(setPage(page))
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h3>{error}</h3>
  }

  return (
    <div>
      <ul>
        {todos.map((todo: any) =>
          <li key={todo.id}>{todo.id} - {todo.title}</li>
        )}
        {pages.map(p =>
          <button
            key={p}
            style={{background:p === page ? 'pink' : 'initial'}}
            onClick={() => onChangePage(p)}
          >
            {p}
          </button>
        )}
      </ul>
    </div>
  )
}