// export const findUserByEmail = async (email?: string | null) => {
//   if (!email) return null;

//   const result = await client
//     .request<FindUserQuery>(FindUserDocument, { email })
//     .catch((e) => console.error(e));

//   return result?.users?.[0] || null;
// };
