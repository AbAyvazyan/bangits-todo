import TodoForm from '@components/TodoForm';
import TodoList from '@components/TodoList';
import styles from './style.module.scss';

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <TodoForm />
      <TodoList />
    </section>
  );
};

export default Home;