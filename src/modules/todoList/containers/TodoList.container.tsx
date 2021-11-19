import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { VButton, VInput, VModal } from '../../../components';
import service from '../todoList.service';
import { ITodo } from '../todoList.types';
import { INITIAL_VALUES } from '../todoList.constants';

export default function TodoContainer(): ReactElement {
  const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<ITodo>(INITIAL_VALUES);

  const { data: todos, isLoading, error } = service.useFetchAllTodosQuery(limit);
  const [createTodo] = service.useCreateTodoMutation();
  const [deleteTodo] = service.useDeleteTodoMutation();
  const [updateTodo] = service.useUpdateTodoMutation();

  console.log('todos ---', todos);
  

  const {
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<ITodo>({
    mode: 'onChange',
    defaultValues: INITIAL_VALUES,
  });

  const handleToggle = () => {
    setModal(true);
  };

  const handleUpdateModal = (todo: ITodo) => {
    setModal(true);
    setData(todo);
    setValue('title', todo.title);
  };

  const handleCreate = async (todo: ITodo) => {
    await createTodo(todo);
  };

  const handleUpdate = async (todo: ITodo) => {
    await updateTodo(todo);
  };

  const handleChanged = async (todo: ITodo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
  };

  const onSubmit = (todo: ITodo) => {
    data.title ? handleUpdate({ ...data, title: todo.title } as ITodo) : handleCreate({ ...data, ...todo } as ITodo);
    reset();
    setData(INITIAL_VALUES);
    setModal(false);
  };

  const handleDelete = (todo: ITodo) => {
    deleteTodo(todo);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]); // eslint-disable-line

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Cant load todos</h3>;
  }

  return (
    <div>
      <VButton className="mb-4" onClick={handleToggle}>
        Create task
      </VButton>
      <hr />
      <ul>
        {todos?.map((todo: ITodo) => (
          <li className="border flex items-center" key={todo.id}>
            <input
              className="ml-2 mr-2"
              type="checkbox"
              onChange={() => handleChanged(todo)}
              checked={todo.completed}
            />
            <div className="mr-4">
              {todo.id} - {todo.title}
            </div>
            <button className="text-red-400" onClick={() => handleDelete(todo)}>
              Delete &nbsp;
            </button>
            <button onClick={() => handleUpdateModal(todo)}>&nbsp; Update</button>
          </li>
        ))}
      </ul>
      <hr />
      <VButton className="mt-4" onClick={() => setLimit((prev) => prev + 10)}>
        Load more
      </VButton>
      <VModal title="Create post" visible={modal} setVisible={setModal}>
        <form className="flex flex-col items-baseline" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <div className="mb-4">
                <VInput {...rest} placeholder="Task name" />
              </div>
            )}
          />
        </form>
      </VModal>
    </div>
  );
}
