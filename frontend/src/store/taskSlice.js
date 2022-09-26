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
  }),
});

export const { useGetTasksQuery } = taskApiSlice;
