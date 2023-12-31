import Link from 'next/link';

import { RSSchoolSvg } from '../svg-icons';
import s from './footer.module.scss';
import FooterMenu from './footer-menu';

const Footer = () => {
  return (
    <footer className={s.main}>
      <div className={s.wrapp}>
        <div className={s.content}>
          <Link
            href='https://rs.school/react/'
            target='_blank'
            rel='noopener noreferrer'
            className={s.schoolLink}
          >
            <RSSchoolSvg className={s.svgSchool} />
          </Link>
          <p className={s.title}>© 2023 GraphiQL | ApiFinder</p>
          <FooterMenu />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
