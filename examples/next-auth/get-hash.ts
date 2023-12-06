import { NextApiRequest, NextApiResponse } from 'next';

import { hashValue } from '../../src/helpers/hash-password';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password }: { password: string } = req.body;
  try {
    const hash = await hashValue(password);
    res.status(200).json({ hash });
  } catch (error) {
    res.status(405).json(error);
  }
}
