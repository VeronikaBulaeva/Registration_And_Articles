import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, QueryReturnValue } from '@reduxjs/toolkit/query/react';
import { ArticleType } from '@/components/Article/Article.tsx';
import { CommentType } from '@/components/Comments/Comments.tsx';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setUser } from '@/app/profile';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, AuthType, ChangePasswordType, RegistrationType, User } from '@/app/types.ts';

const access_token = document.cookie
  .split(';')
  .find((e) => e.includes('access'))
  ?.split('=')[1];
const refresh_token = document.cookie
  .split(';')
  .find((e) => e.includes('refresh'))
  ?.split('=')[1];

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://darkdes-django-t3b02.tw1.ru/api/v1/',
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
      {
        url: 'token/refresh',
        method: 'POST',
        body: {
          refresh: refresh_token,
        },
      },
      api,
      extraOptions,
    )) as QueryReturnValue<{ access: string }>;
    if (refreshResult.data) {
      const accessData = jwtDecode<{
        token_type: 'access' | 'refresh';
        exp: number;
        jti: string;
        user_id: number;
      }>(refreshResult.data.access);
      const accessExpiration = new Date(accessData.exp * 1000).toUTCString();
      document.cookie = `access_token=${refreshResult.data?.access}; expires=${accessExpiration}`;
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setUser(null));
    }
  }
  return result;
};

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  keepUnusedDataFor: 0,
  tagTypes: ['Comment', 'Article'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthType>({
      query: (body) => ({
        url: 'token/',
        method: 'POST',
        body,
      }),
    }),
    registration: builder.mutation<{ user: User }, RegistrationType>({
      query: (body) => ({
        url: 'registration/',
        method: 'POST',
        body,
      }),
    }),
    getArticles: builder.query<ArticleType[], null>({
      query: () => ({
        url: 'articles/',
      }),
      providesTags: ['Article'],
    }),
    getArticle: builder.query<ArticleType, string>({
      query: (id) => ({
        url: `articles/${id}`,
      }),
      providesTags: ['Article'],
    }),
    getArticleComments: builder.query<CommentType[], string>({
      query: (id) => ({
        url: `articles/${id}/comments/`,
      }),
      providesTags: ['Comment'],
    }),
    addArticle: builder.mutation<unknown, FormData>({
      query: (body) => ({
        url: 'articles/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation<
      unknown,
      {
        data: FormData;
        id: number;
      }
    >({
      query: ({ id, data }) => ({
        url: `articles/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `articles/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
    sendComment: builder.mutation<CommentType[], { id: number | string; body: { content: string; parent?: number } }>({
      query: ({ id, body }) => ({
        url: `articles/${id}/comments/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    changePassword: builder.mutation<{ Success: boolean }, ChangePasswordType>({
      query: (body) => ({
        url: 'change-password/',
        method: 'PUT',
        body,
      }),
    }),
    deleteComment: builder.mutation<unknown, { article_id: number; comment_id: number }>({
      query: ({ article_id, comment_id }) => ({
        url: `articles/${article_id}/comments/${comment_id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetArticleCommentsQuery,
  useSendCommentMutation,
  useChangePasswordMutation,
  useDeleteCommentMutation,
  useDeleteArticleMutation,
  useAddArticleMutation,
  useUpdateArticleMutation,
} = articlesApi;
