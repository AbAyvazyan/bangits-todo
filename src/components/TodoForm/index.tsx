import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@app/store.ts';
import { addTodo } from '@features/todos.ts';
import { FormInputsSubmit } from '@utils/types.ts';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from './style.module.scss';

// Validating fields
const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    date: yup
      .date()
      .required('Date is required')
      .typeError('Invalid date')
      .min(new Date(), 'Date cannot be in the past'),
  })
  .required();

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputsSubmit>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: Omit<FormInputsSubmit, 'id'>) => {
    const isoDate = new Date(data.date).toISOString();
    dispatch(addTodo({ ...data, date: isoDate }));
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>To Do</h2>
      <Input
        label="Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Input label="Description" multiline rows={4} {...register('description')} />
      <Input
        type="date"
        {...register('date')}
        error={!!errors.date}
        helperText={errors.date?.message}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default TodoForm;
