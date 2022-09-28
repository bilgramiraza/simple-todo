import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const taskAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = taskAdapter.getInitialState();

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      transformResponse: (responseData) => taskAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => [
        { type: 'task', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'task', id })),
      ],
    }),
    addNewTask: builder.mutation({
      query: (initialTask) => ({
        url: '/tasks',
        method: 'POST',
        body: {
          task: initialTask,
          date: new Date().toISOString(),
          isComplete: false,
        },
      }),
      invalidatesTags: [{ type: 'task', id: 'LIST' }],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'task', id: arg.id }],
    }),
    toggleTaskCompletion: builder.mutation({
      query: ({ id, isComplete }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: { isComplete },
      }),
      async onQueryStarted({ id, isComplete }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApiSlice.util.updateQueryData('getTasks', 'getTasks', (draft) => {
            const task = draft.entities[id];
            if (task) task.isComplete = isComplete;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskCompletionMutation,
} = taskApiSlice;
