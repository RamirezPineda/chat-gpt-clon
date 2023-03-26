import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatInfo, UserChats } from "../models/chat.model";

interface ResponseData {
  _id: string;
  responseText: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000" }),
  tagTypes: ["UserChats", "Chat"],
  endpoints: (builder) => ({
    getChat: builder.query<UserChats, string>({
      query: (_id) => `/api/chats/${_id}`,
      providesTags: ["Chat"],
    }),
    getUserChats: builder.query<UserChats[], string>({
      query: (id) => `/api/chats-user/${id}`,
      providesTags: ["UserChats"],
    }),
    sendNewMessage: builder.mutation<ResponseData, ChatInfo>({
      query: (chat) => ({
        url: "/api/chats",
        method: "POST",
        body: chat,
      }),
      invalidatesTags: ["UserChats"],
    }),
    sendMessage: builder.mutation<ResponseData, ChatInfo>({
      query: (chat) => ({
        url: "/api/chats",
        method: "POST",
        body: chat,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatQuery,
  useGetUserChatsQuery,
  useSendMessageMutation,
  useSendNewMessageMutation,
} = chatApi;
