import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store.ts';
import { markOverdue } from '@features/todos.ts';
import SingleTodo from '@components/TodoList/SingleTodo';
import styles from './style.module.scss';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.nowActive);

  useEffect(() => {
    dispatch(markOverdue());
  }, []);
  return <div className={styles.todoList}>
    <div className={styles.panel}>
      <div>Title</div>
      <div>Description</div>
      <div>State</div>
      <div>Date</div>
      <div>Actions</div>
    </div>
    {todos.map((todo) => {
      return <SingleTodo key={todo.id} {...todo} />;
    })}
  </div>;
};

export default TodoList;