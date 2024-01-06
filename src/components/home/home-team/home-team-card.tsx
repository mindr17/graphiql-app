'use client';

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from '@nextui-org/react';

interface HomeTeamCardProps {
  name: string;
  github: string;
  role: string;
  bio: string;
  link: string;
}

const HomeTeamCard = (props: HomeTeamCardProps) => {
  const { name, github, role, bio, link } = props;
  return (
    <Card shadow='sm'>
      <CardHeader className='flex gap-3'>
        <Avatar
          radius='full'
          size='lg'
          src={`https://github.com/${github}.png`}
          isBordered
        />
        <div className='flex flex-col gap-1 items-start justify-center'>
          <h4 className='text-small font-semibold leading-none text-default-600'>
            {name}
          </h4>
          <h5 className='text-small tracking-tight text-default-400'>
            {role}
          </h5>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{bio}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          href={`https://github.com/${github}`}
          isExternal
          showAnchorIcon
        >
          {link}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HomeTeamCard;
