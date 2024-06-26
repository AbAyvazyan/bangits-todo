import { FC, useState } from 'react';
import { deleteTodo, FormInputs } from '@features/todos.ts';
import { useAppDispatch } from '@app/store.ts';
import { truncateString } from '@utils/truncate.ts';
import EditTodoModal from '@components/EditModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './style.module.scss';

const SingleTodo: FC<FormInputs> = (todo) => {
  const { title, description, todoState, id, date } = todo;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const onToDoDeleteHandler = () => {
    dispatch(deleteTodo(id));
  };

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <>
      <div className={styles.todo}>
        <div>{truncateString(title, 4)}</div>
        <div>{truncateString(description, 4)}</div>
        <div>{todoState}</div>
        <div>{formattedDate}</div>
        <div className={styles.icons}>
        <span onClick={() => setIsOpen(true)}>
          <EditIcon />
        </span>
          <span onClick={onToDoDeleteHandler}>
          <DeleteIcon />
        </span>
        </div>
      </div>
      <EditTodoModal open={isOpen} onClose={() => setIsOpen(false)} todo={todo} />
    </>
  );
};

export default SingleTodo;