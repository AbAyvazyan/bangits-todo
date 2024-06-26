import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface FormInputs {
  id: string;
  title: string;
  description?: string;
  date: string;
  todoState: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}

export interface AllToDos {
  nowActive: FormInputs[];
  trash: FormInputs[];
}

const initialState: AllToDos = {
  nowActive: [],
  trash: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo(state, action: PayloadAction<Pick<FormInputs, 'title' | 'description' | 'date'>>) {
        state.nowActive.push({ id: uuidv4(), todoState: 'Pending', ...action.payload });
      },
      updateTodo(state, action: PayloadAction<FormInputs>) {
        const { id, title, description, date, todoState } = action.payload;
        const todoToUpdate = state.nowActive.find(todo => todo.id === id);
        if (todoToUpdate) {
          todoToUpdate.title = title;
          todoToUpdate.description = description;
          todoToUpdate.date = date;
          todoToUpdate.todoState = todoState;
        }
      },
      deleteTodo(state, action: PayloadAction<string>) {
        const idToDelete = action.payload;
        const deletedTodo = state.nowActive.find(todo => todo.id === idToDelete);
        if (deletedTodo) {
          state.nowActive = state.nowActive.filter(todo => todo.id !== idToDelete);
          state.trash.push({ ...deletedTodo, todoState: 'Removed' });
        }
      },
      markOverdue(state) {
        state.nowActive.forEach(todo => {
          if (isDateOverdue(todo.date)) {
            todo.todoState = 'Overdue';
          }
        });
      },
    },
  })
;

export const { addTodo, updateTodo, deleteTodo, markOverdue } = todoSlice.actions;

export default todoSlice.reducer;

function isDateOverdue(dateString: string): boolean {
  const currentDate = new Date();
  const dueDate = new Date(dateString);
  return dueDate < currentDate;
}
