import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatInfo, UserChats } from "../models/chat.model";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000" }),
  endpoints: (builder) => ({
    getAllChats: builder.query<ChatInfo, void>({
      query: () => "/api/chats",
    }),
    getUserChats: builder.query<UserChats[], string>({
      query: (id) => `/api/chats-user/${id}`,
    }),
  }),
});

export const { useGetAllChatsQuery, useGetUserChatsQuery } = chatApi;
