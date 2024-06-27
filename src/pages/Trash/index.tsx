import { useAppSelector } from '@app/store.ts';
import { FormInputs } from '@features/todos.ts';
import { formateDate } from '@utils/formatDate.ts';
import styles from './style.module.scss';

const Trash = () => {
  const trash = useAppSelector((state) => state.todos.trash);

  return (
    <section className={styles.trash}>
      <h2>Trash</h2>

      <div className={styles.trashHolder}>
        {trash.map((item: FormInputs) => {
          return (
            <div className={styles.panel}>
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.todoState}</div>
              <div>{formateDate(item.date)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trash;
