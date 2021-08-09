import React, { ReactElement, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { useReduxDispatch } from "../../../helpers";
import useDebounce from "../../../helpers/useDebounce";
import { fetchTodo, setPage } from "../todoList.actions";
import { getTodoList } from "../todoList.selectors";

export default function TodoContainer(): ReactElement {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(searchTodo, 1000);

  const { todos, loading, error, page, itemsLimit } = useSelector(getTodoList)

  const dispatch = useReduxDispatch();

  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(fetchTodo(page, itemsLimit));
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangePage = (page: any) => {
    dispatch(setPage(page))
  }

  function searchTodo(query: string) {
    fetch(`https://jsonplaceholder.typicode.com/todos?query=` + query)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSearch(e.target.value)
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h3>{error}</h3>
  }
  

  return (
    <div>
      <input onChange={onChangeSearch} type="search" placeholder='Search' />
      <button onClick={() => debouncedSearch(search)}>button</button>
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