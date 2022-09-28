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
  }),
});

export const { useGetTasksQuery, useAddNewTaskMutation, useDeleteTaskMutation } = taskApiSlice;
