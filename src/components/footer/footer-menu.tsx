'use client';

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { FC } from 'react';

import { TeamSvg } from '../svg-icons';
import styles from './footer.module.scss';

const team = [
  {
    name: 'mindr17',
    imageSrc: 'https://avatars.githubusercontent.com/u/6329657?v=4',
  },
  {
    name: 'ldemyanov',
    imageSrc: 'https://avatars.githubusercontent.com/u/109416811?v=4',
  },
  {
    name: 'MaxLisyanskiy',
    imageSrc: 'https://avatars.githubusercontent.com/u/59924323?v=4',
  },
];

const FooterMenu: FC = () => {
  return (
    <Dropdown placement='left-start' backdrop='blur'>
      <DropdownTrigger>
        <Button variant='faded' className={styles.svgTeam} isIconOnly>
          <TeamSvg />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        {team.map((member) => {
          const { name, imageSrc } = member;

          return (
            <DropdownItem
              key={name}
              href={`https://github.com/${name}`}
              target='_blank'
              rel='noopener noreferrer'
              startContent={
                <Avatar size='sm' src={imageSrc} isBordered />
              }
            >
              {`@${name}`}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FooterMenu;
