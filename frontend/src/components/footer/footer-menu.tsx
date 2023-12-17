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
import s from './footer.module.scss';

const FooterMenu: FC = () => {
  return (
    <Dropdown placement='top'>
      <DropdownTrigger>
        <Button variant='faded' className={s.svgTeam} isIconOnly>
          <TeamSvg />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem
          key='mindr17'
          href={`https://github.com/mindr17`}
          target='_blank'
          rel='noopener noreferrer'
          startContent={
            <Avatar
              size='sm'
              src='https://avatars.githubusercontent.com/u/6329657?v=4'
              isBordered
            />
          }
        >
          @mindr17
        </DropdownItem>
        <DropdownItem
          key='ldemyanov'
          href={`https://github.com/ldemyanov`}
          target='_blank'
          rel='noopener noreferrer'
          startContent={
            <Avatar
              size='sm'
              src='https://avatars.githubusercontent.com/u/109416811?v=4'
              isBordered
            />
          }
        >
          @ldemyanov
        </DropdownItem>
        <DropdownItem
          key='MaxLisyanskiy'
          href={`https://github.com/MaxLisyanskiy`}
          target='_blank'
          rel='noopener noreferrer'
          startContent={
            <Avatar
              size='sm'
              src='https://avatars.githubusercontent.com/u/59924323?v=4'
              isBordered
            />
          }
        >
          @MaxLisyanskiy
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FooterMenu;
