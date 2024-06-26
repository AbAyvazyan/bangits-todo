import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '@app/store.ts';
import { FormInputs, updateTodo } from '@features/todos.ts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@components/Input';

interface EditTodoModalProps {
  open: boolean;
  onClose: () => void;
  todo: FormInputs;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  date: yup.date()
    .required('Date is required')
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past'),
}).required();

const EditTodoModal: React.FC<EditTodoModalProps> = ({ open, onClose, todo }) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      title: todo.title,
      description: todo.description || '',
      date: String(new Date(todo.date).toISOString().split('T')[0]),
      todoState: todo.todoState,
    },
  });

  const handleSaveChanges = (data: FormInputs) => {
    const isoDate = new Date(data.date).toISOString();
    data.id = todo.id;
    dispatch(updateTodo({ ...data, date: isoDate }));
    onClose(); // Close the modal after saving changes
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" gutterBottom>
          Edit Todo
        </Typography>
        <form onSubmit={handleSubmit(handleSaveChanges)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="state">State</InputLabel>
            <Controller
              name="todoState"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="state"
                  label="State"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Overdue">Overdue</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                fullWidth
                type="date"
                label="Date"
                variant="outlined"
                margin="normal"
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          <Button variant="contained" type="submit" startIcon={<EditIcon />}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTodoModal;
