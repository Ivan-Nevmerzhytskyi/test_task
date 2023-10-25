/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../ReduxStore';
import { UserType } from '../../common/types/UserType';
import * as userService from '../../services/users';

type UsersState = {
  users: UserType[];
  loading: boolean;
  errorMessage: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  errorMessage: '',
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  () => userService.getUsers(),
);

export const addUser = createAsyncThunk(
  'users/addUser',
  (newUser: Omit<UserType, 'id'>) => {
    return userService.addUser(newUser);
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  (userChanges: UserType) => {
    return userService.updateUser(userChanges);
  },
);

export const partialUpdateUser = createAsyncThunk(
  'users/partialUpdateUser',
  async (userChanges: Partial<UserType> & Pick<UserType, 'id'>) => {
    const updatedBook = await userService.partialUpdateUser(userChanges);

    return updatedBook;
  },
);

// export const deleteUser = createAsyncThunk(
//   'users/deleteUser',
//   async (id: string) => {
//     await userService.deleteUser(id);

//     return id;
//   },
// );

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.results;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.errorMessage = 'Unable to load users';
      });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const apdatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === apdatedUser.id);

      state.users.splice(index, 1, apdatedUser);
    });

    builder.addCase(partialUpdateUser.fulfilled, (state, action) => {
      const apdatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === apdatedUser.id);

      state.users.splice(index, 1, apdatedUser);
    });

    // builder.addCase(deleteUser.fulfilled, (state, action) => {
    //   state.users = state.users.filter(user => user.id !== action.payload);
    // });
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;

// Delete user and render, then in case of a server error
// return the previous array of users before deletion and render
export const deleteUser = (id: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const prevUsers = getState().users.users;

    dispatch(setUsers(prevUsers.filter(user => user.id !== id)));

    try {
      await userService.deleteUser(id);
    } catch (error) {
      dispatch(setUsers(prevUsers));

      throw error;
    }
  };
};
