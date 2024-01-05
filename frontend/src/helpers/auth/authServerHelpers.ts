import { GraphQLClient } from 'graphql-request';

import { config } from '../../config';
import { Users } from '../../graphql/private/gql/graphql';

export enum OrderToServer {
  addFavorite = 'Add Favorite',
  deleteFavorite = 'Delete Favorite',
  changePassword = 'Change Password',
  addPost = 'Add Post',
  editPost = 'Edit Post',
  deletePost = 'Delete Post',
}

interface PostRequest {
  post_id?: number;
  rating?: number;
  project?: number;
  comment?: string;
  slug?: string;
  user_id?: string;
}

interface ChangeRequestBody extends PostRequest {
  password?: string;
  favorites?: FavoritesProjects[];
}

export const authClient = new GraphQLClient(
  `${config.fetchUrl}/graphql`,
  {
    headers: {
      Authorization: `Bearer ${process.env.FETCH_ACCESS_TOKEN}`,
    },
  }
);

export const clearCache = async () => {
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESET_TOKEN}`,
    },
  };

  await fetch(
    'https://goapi.batumi.estate/utils/cache/clear',
    options
  );
};

export const orderToServer = async (
  data: string,
  order: OrderToServer
) => {
  const body = { data, order };
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  };

  const res = await fetch(`/api/auth-server`, options);

  return res.json();
};

export const getHashedPassword = async (password: string) => {
  const body = { password };
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  };
  const res = await fetch(`/api/auth/get-hash`, options);

  return res.json();
};

type RequestMethod = 'POST' | 'PATCH' | 'GET' | 'DELETE';

export const createRequestOptions = (
  method: RequestMethod,
  body: {
    password?: string;
    favorites?: FavoritesProjects[];
  } | null = null
) =>
  ({
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FETCH_ACCESS_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : null,
  }) as RequestInit;

interface FavoritesProjects {
  id: string;
  users_id: string;
  projects_id: number;
}
interface MyUser extends Users {
  favorites: FavoritesProjects[];
}

interface FavoritesResponse {
  projects_id: { slug: string };
}

interface UserFavoritesProjects {
  favorites: FavoritesResponse[];
}

interface ReviewsResponse {
  project: { id: string };
}
interface UserReviews {
  reviews: ReviewsResponse[];
}

export const getUser = async (email: string | null | undefined) => {
  if (!email) return undefined;
  try {
    const res = await fetch(
      `${config.fetchUrl}/items/users?filter[email][_eq]=${email}&fields=favorites.*,id,email,password`,
      createRequestOptions('GET')
    );
    const { data }: { data: MyUser[] } = await res.json();
    const user = data[0];
    return user;
  } catch (error) {
    return undefined;
  }
};

export const fetchUserFavorites = async (
  email: string | null | undefined
) => {
  if (!email) return undefined;
  try {
    const res = await fetch(
      `${config.fetchUrl}/items/users?filter[email][_eq]=${email}&fields=favorites.projects_id.slug`,
      createRequestOptions('GET')
    );
    const { data }: { data: UserFavoritesProjects[] } =
      await res.json();

    const favorites = data[0].favorites.map(
      (project) => project.projects_id.slug
    );
    return favorites;
  } catch (error) {
    return undefined;
  }
};

export const fetchUserReviews = async (
  email: string | null | undefined
) => {
  if (!email) return undefined;
  try {
    const res = await fetch(
      `${config.fetchUrl}/items/users?filter[email][_eq]=${email}&fields=reviews.project.id`,
      createRequestOptions('GET')
    );

    const { data }: { data: UserReviews[] } = await res.json();

    const projects = data[0].reviews.map(
      (project) => project.project.id
    );

    return projects;
  } catch (error) {
    return undefined;
  }
};

export const createBodyForPost = (
  body: string,
  userId: string,
  order: OrderToServer
) => {
  if (
    order === OrderToServer.addPost ||
    order === OrderToServer.editPost
  ) {
    try {
      const post = JSON.parse(body) as ChangeRequestBody;
      post.user_id = userId;
      return post;
    } catch (error) {
      return {} as ChangeRequestBody;
    }
  }
  if (order === OrderToServer.changePassword) {
    return { password: body } as ChangeRequestBody;
  }
  return {} as ChangeRequestBody;
};

const checkDataForUrl = (data: unknown) =>
  typeof data === 'string' ? data : '';

export const orderToDatabase = async (
  order: OrderToServer,
  dataToChange: string,
  email: string | null | undefined
) => {
  try {
    const user = await checkUser(email);
    if (user) {
      const bodyForPost = createBodyForPost(
        dataToChange,
        user.id,
        order
      );

      const OrderToServerData = {
        [OrderToServer.changePassword]: {
          body: bodyForPost,
          url: `${config.fetchUrl}/items/users/${user.id}`,
          method: 'PATCH' as RequestMethod,
        },
        [OrderToServer.addFavorite]: {
          body: {
            favorites: [
              ...user.favorites,
              {
                id: dataToChange,
                users_id: user.id,
                projects_id: Number(dataToChange),
              },
            ],
          } as ChangeRequestBody,
          url: `${config.fetchUrl}/items/users/${user.id}`,
          method: 'PATCH' as RequestMethod,
        },
        [OrderToServer.deleteFavorite]: {
          body: {
            favorites: user.favorites.filter((favorite) => {
              return favorite.projects_id !== Number(dataToChange);
            }),
          } as ChangeRequestBody,
          url: `${config.fetchUrl}/items/users/${user.id}`,
          method: 'PATCH' as RequestMethod,
        },
        [OrderToServer.editPost]: {
          body: bodyForPost,
          url: `${config.fetchUrl}/items/reviews/${checkDataForUrl(
            bodyForPost?.post_id
          )}`,
          method: 'PATCH' as RequestMethod,
        },
        [OrderToServer.addPost]: {
          body: bodyForPost,
          url: `${config.fetchUrl}/items/reviews`,
          method: 'POST' as RequestMethod,
        },
        [OrderToServer.deletePost]: {
          body: bodyForPost,
          url: `${config.fetchUrl}/items/reviews/${checkDataForUrl(
            dataToChange
          )}`,
          method: 'DELETE' as RequestMethod,
        },
      };

      const { url, method, body } = OrderToServerData[order];
      const response = await fetch(
        url,
        createRequestOptions(method, body)
      );
      return response;
    }
  } catch (error) {
    throw new Error('Error when changed user');
  }
};
