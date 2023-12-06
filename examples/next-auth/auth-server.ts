import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import {
  orderToDatabase,
  OrderToServer,
} from '@/src/helpers/authServerHelpers';

import { authOptions } from './auth/[...nextauth]';

const returnWithMsg = (message: string, res: NextApiResponse) => {
  res.status(200).json({ message });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session?.user?.email) {
      returnWithMsg('User not authorized', res);

      return;
    }

    const { data, order }: { data: string; order: OrderToServer } =
      req.body;

    const response = await orderToDatabase(
      order,
      data,
      session?.user?.email
    );

    if (!response?.ok) {
      returnWithMsg('Order not complete', res);

      return;
    }

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    res.status(405).json({ message: 'Error' });
  }
}
