import {
  CreateUserDocument,
  CreateUserMutation,
  Users,
} from '@/src/gql/graphql';
import { client } from '@/src/helpers/clientGq';

export const createUser = async (
  user: Pick<Users, 'email' | 'password' | 'googleId'>
) => {
  try {
    const result = await client.request<CreateUserMutation>(
      CreateUserDocument,
      {
        email: user.email,
        password: user.password,
        googleId: user.googleId,
      }
    );
    return result;
  } catch (e) {
    if (e.response && e.response.errors) {
      // Handle GraphQL errors here
      console.error('GraphQL Error:', e.response.errors);
    } else {
      // Handle other errors (network error, etc.)
      console.error('Network Error:', e);
    }
  }
};
